/*
 * ====================================================================
 *
 * Copyright (C) 2019 GeoSolutions S.A.S.
 * http://www.geo-solutions.it
 *
 * GPLv3 + Classpath exception
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. 
 *
 * ====================================================================
 *
 * This software consists of voluntary contributions made by developers
 * of GeoSolutions.  For more information on GeoSolutions, please see
 * <http://www.geo-solutions.it/>.
 *
 */
package it.geosolutions.georchestra;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;
import java.util.stream.Stream;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import net.sf.json.JSONException;

/**
 * Servlet that outputs the MapStore configuration JSON (localConfig.json).
 * Allows externalizing the localConfig.json position (outside of the MapStore webapp container).
 * 
 * Can be configured with one or more config file locations (the servlet will try to load all of them,
 * in order, until a valid file is found). The location can be an absolute path or a webapp relative one.
 * 
 * <init-param>
 *     <param-name>configLocation</param-name>
 *     <param-value>${georchestra.datadir}/mapstore/localConfig.json,localConfig.json</param-value>
 * </init-param>
 * 
 * Optionally, the GeOrchestra configuration property file can be read to override / augment the
 * configuration.
 * 
 * <init-param>
 *     <param-name>georchestraConfigLocation</param-name>
 *     <param-value>${georchestra.datadir}/default.properties</param-value>
 * </init-param>
 * 
 * Properties in this file will be inserted as JSON properties in the main file, following
 * a list of mappings. The default mappings are:
 * 
 *  header.url=headerUrl (the headerUrl property will be mapped to <root>.header.url)
 *  header.height=headerHeight (the headerHeight property will be mapped to <root>.header.height)
 *  
 * To customize mappings, the following parameter can be used:
 * 
 *  <init-param>
 *     <param-name>georchestraConfigMappings</param-name>
 *     <param-value>header.url=headerUrl,header.height=headerHeight</param-value>
 *  </init-param>
 * 
 * @author mauro.bartolomeoli at geo-solutions.it
 *
 */
public class ConfigLoaderServlet extends HttpServlet{
    
    private String[] configLocations = new String[] {"localConfig.json"};
    String georchestraConfigLocation = null;
    String[] georchestraConfigMappings = new String[] {"header.url=headerUrl", "header.height=headerHeight"};
    ServletContext ctx;
    Logger LOGGER = Logger.getLogger(ConfigLoaderServlet.class);
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        ctx = config.getServletContext();
        String location = config.getInitParameter("configLocation");
        if (location == null) {
            LOGGER.warn("no configLocation parameter specified, using default localConfig.json");
        } else {
            configLocations = location.split(",");
        }
        georchestraConfigLocation = config.getInitParameter("georchestraConfigLocation");
        String mappings = config.getInitParameter("georchestraConfigMappings");
        if (georchestraConfigLocation == null) {
            LOGGER.warn("no georchestraConfigLocation parameter specified, not loading overrides");
        } else if (mappings == null) {
            LOGGER.warn("no georchestraConfigMappings parameter specified, using defaults");
        } else {
            georchestraConfigMappings = mappings.split(",");
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException, JSONException {
        for(String configLocation : configLocations) {
            File configFile = new File(configLocation);
            if (!configFile.exists() && !configFile.isAbsolute()) {
                configFile = new File(ctx.getRealPath(configLocation));
            }
            if (configFile.exists()) {
                // use the first existing file in the list
                try (Stream<String> stream =
                        Files.lines( Paths.get(configFile.getAbsolutePath()), StandardCharsets.UTF_8); Writer writer = resp.getWriter()) {
                    ConfigLoader loader = new ConfigLoader(stream);
                    if (georchestraConfigLocation != null && georchestraConfigMappings.length > 0) {
                        if (new File(georchestraConfigLocation).exists()) {
                            try (FileReader reader = new FileReader(georchestraConfigLocation)) {
                                Properties props = new Properties();
                                props.load(reader);
                                loader.setOverrides(props, georchestraConfigMappings);
                            }
                        } else {
                            LOGGER.warn("georchestraConfig file not found in " + georchestraConfigLocation);
                        }
                    }
                    
                    resp.setHeader("Content-Type", "application/json");
                    resp.setCharacterEncoding("UTF-8");
                    loader.writeConfig(writer);
                    writer.flush();
                    return;
                }
            }
        }
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }    
}
