package it.geosolutions.georchestra;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

public class ConfigLoader extends HttpServlet{
    
    private String[] configLocations = new String[] {"localConfig.json"};
    ServletContext ctx;
    Logger LOGGER = Logger.getLogger(ConfigLoader.class);
    
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
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        for(String configLocation : configLocations) {
            File configFile = new File(configLocation);
            if (!configFile.exists() && !configFile.isAbsolute()) {
                configFile = new File(ctx.getRealPath(configLocation));
            }
            if (configFile.exists()) {
                // use the first existing file in the list
                try (FileReader reader = new FileReader(configFile); Writer writer = resp.getWriter()) {
                    resp.setHeader("Content-Type", "application/json");
                    resp.setCharacterEncoding("UTF-8");
                    IOUtils.copy(reader, writer);
                    writer.flush();
                    return;
                }
            }
        }
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }
    
}
