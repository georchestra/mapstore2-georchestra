package fr.lepuyenvelay.msiframe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MsIframeController {
    @Autowired
    Environment env;
    
    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView MsIframeMapper() throws Exception {
        ModelAndView mv = new ModelAndView("msiframe");
        mv.addObject("defaultContext", env.getProperty("msIframe.defaultContext"));
        return mv;
    }
}
