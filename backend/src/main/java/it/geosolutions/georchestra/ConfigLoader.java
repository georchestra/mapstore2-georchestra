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

import java.io.IOException;
import java.io.Writer;
import java.util.Arrays;
import java.util.Properties;
import java.util.stream.Stream;
import org.apache.log4j.Logger;
import net.sf.json.JSONObject;

/**
 * MapStore configuration file loader.
 * 
 * Loads a JSON  configuration file from a Stream and optionally
 *  - applies overrides from a Properties object (with given mappings)
 *  - outputs the read / processed file to a given Writer
 * 
 * @author mauro.bartolomeoli at geo-solutions.it
 *
 */
public class ConfigLoader {
    Stream<String> configSource;
    Properties overrides;
    String[] overridesMappings = new String[] {};
    
    Logger LOGGER = Logger.getLogger(ConfigLoader.class);
    
    public ConfigLoader(Stream<String> configSource) {
        super();
        this.configSource = configSource;
    }
    
    /**
     * Apply overrides from the given properties.
     * 
     * @param overrides list of key, value pairs
     * @param mappings list of mappings, in the form <json path> = propertyname
     */
    public void setOverrides(Properties overrides, String[] mappings) {
        this.overrides = overrides;
        this.overridesMappings = mappings;
    }

    /**
     * Writes the final configuration on the given writer.
     * 
     * @param writer
     * @throws IOException
     */
    public void writeConfig(Writer writer) throws IOException {
        JSONObject jsonObject = readJsonConfig(configSource);
        if (overrides != null) {
            for(String mapping : overridesMappings) {
                fillMapping(mapping, overrides, jsonObject);
            }
        }
        writer.write(jsonObject.toString());
    }
    
    private JSONObject readJsonConfig(Stream<String> stream) {
        StringBuilder contentBuilder = new StringBuilder();
        stream.forEach(s -> contentBuilder.append(s).append("\n"));
        String json = contentBuilder.toString();
        JSONObject jsonObject = JSONObject.fromObject( json );
        return jsonObject;
    }
    
    private void fillMapping(String mapping, Properties props, JSONObject jsonObject) {
        String[] parts = mapping.split("=");
        if (parts.length != 2 || parts[0].trim().isEmpty() || parts[1].trim().isEmpty()) {
            LOGGER.warn("Mapping incorrectly specified: " + mapping + ", ignoring");
        } else {
            String path = parts[0];
            String propName = parts[1];
            String value = props.getProperty(propName, "");
            setJsonProperty(jsonObject, path.split("\\."), value);
        }
        
    }

    private void setJsonProperty(JSONObject jsonObject, String[] path, String value) {
        if(path.length == 0) {
            return;
        }
        if(path.length == 1) {
            if (jsonObject.containsKey(path[0])) {
                jsonObject.replace(path[0], value);
            } else {
                jsonObject.element(path[0], value);
            }
        } else {
            String[] newPath = Arrays.copyOfRange(path, 1, path.length);
            JSONObject rootObject;
            if (jsonObject.containsKey(path[0])) {
                if (jsonObject.get(path[0]) instanceof JSONObject) {
                    rootObject = jsonObject.getJSONObject(path[0]);
                } else {
                    jsonObject.replace(path[0], new JSONObject());
                    rootObject = jsonObject.getJSONObject(path[0]);
                }
            } else {
                rootObject = new JSONObject();
                jsonObject.element(path[0], rootObject);
            }
            setJsonProperty(rootObject, newPath, value);
        }
        
    }
}
