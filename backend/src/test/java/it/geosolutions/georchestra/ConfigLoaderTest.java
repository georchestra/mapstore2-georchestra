package it.geosolutions.georchestra;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.fail;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.Properties;
import java.util.stream.Stream;
import org.junit.Test;

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
public class ConfigLoaderTest {
    @Test
    public void testNoOverrides() throws IOException {
        String json = "{\"number\":1,\"string\":\"ok\"}";
        Stream<String> config = createStream(json);
        ConfigLoader loader = new ConfigLoader(config);
        StringWriter writer = new StringWriter();
        
        loader.writeConfig(writer);
        
        assertEquals(json, writer.toString());
    }
    @Test
    public void testOverrides() throws IOException {
        String json = "{\"number\":1,\"string\":\"ok\"}";
        String[] mappings = new String[] {"string=string"};
        Properties overrides = new Properties();
        overrides.put("string", "overridden");
        
        Stream<String> config = createStream(json);
        ConfigLoader loader = new ConfigLoader(config);
        loader.setOverrides(overrides, mappings);
        StringWriter writer = new StringWriter();
        loader.writeConfig(writer);
        
        assertEquals("{\"number\":1,\"string\":\"overridden\"}", writer.toString());
    }
    
    @Test
    public void testOverridesWithMapping() throws IOException {
        String json = "{\"number\":1,\"string\":\"ok\"}";
        String[] mappings = new String[] {"string=mystring"};
        Properties overrides = new Properties();
        overrides.put("mystring", "overridden");
        
        Stream<String> config = createStream(json);
        ConfigLoader loader = new ConfigLoader(config);
        loader.setOverrides(overrides, mappings);
        StringWriter writer = new StringWriter();
        loader.writeConfig(writer);
        
        assertEquals("{\"number\":1,\"string\":\"overridden\"}", writer.toString());
    }
    
    @Test
    public void testOverridesWithNestedPath() throws IOException {
        String json = "{\"number\":1,\"string\":\"ok\",\"obj\":{}}";
        String[] mappings = new String[] {"obj.nested=mystring"};
        Properties overrides = new Properties();
        overrides.put("mystring", "overridden");
        
        Stream<String> config = createStream(json);
        ConfigLoader loader = new ConfigLoader(config);
        loader.setOverrides(overrides, mappings);
        StringWriter writer = new StringWriter();
        loader.writeConfig(writer);
        
        assertEquals("{\"number\":1,\"string\":\"ok\",\"obj\":{\"nested\":\"overridden\"}}", writer.toString());
    }
    
    @Test
    public void testOverridesReplaceWithNestedPath() throws IOException {
        String json = "{\"number\":1,\"obj\":\"ok\"}";
        String[] mappings = new String[] {"obj.nested=mystring"};
        Properties overrides = new Properties();
        overrides.put("mystring", "overridden");
        
        Stream<String> config = createStream(json);
        ConfigLoader loader = new ConfigLoader(config);
        loader.setOverrides(overrides, mappings);
        StringWriter writer = new StringWriter();
        loader.writeConfig(writer);
        
        assertEquals("{\"number\":1,\"obj\":{\"nested\":\"overridden\"}}", writer.toString());
    }
    
    @Test
    public void testErrorOnMalformedConfig() {
        String json = "{\"number\":1,\"string\":\"ok\"";
        try {
            Stream<String> config = createStream(json);
            ConfigLoader loader = new ConfigLoader(config);
            StringWriter writer = new StringWriter();
            
            loader.writeConfig(writer);
            
            assertEquals(json, writer.toString());
            fail();
        } catch(Exception e) {
            assertNotNull(e);
        }
    }

    private Stream<String> createStream(String source) {
       return Arrays.asList(source.split("\n")).stream();
    }
    
}
