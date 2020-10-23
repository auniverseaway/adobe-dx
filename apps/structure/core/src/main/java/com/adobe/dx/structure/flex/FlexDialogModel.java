package com.adobe.dx.structure.flex;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;

import com.adobe.dx.responsive.Breakpoint;
import com.adobe.dx.responsive.ResponsiveConfiguration;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.caconfig.ConfigurationBuilder;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(
    adaptables = { SlingHttpServletRequest.class },
    resourceType = "dx/structure/components/flex"
)
@Exporter(name = "jackson", extensions = "json")
public class FlexDialogModel {
    
    @Self
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resolver;

    private ResponsiveConfiguration configuration;

    @PostConstruct
    void init() {
        Resource resource = request.getResource();
        ConfigurationBuilder builder = resource.adaptTo(ConfigurationBuilder.class);
        if (builder != null) {
            configuration = builder.as(ResponsiveConfiguration.class);
        }
    }

    public List<String> getLabels() {
        List<String> labels = new ArrayList<String>();
        Breakpoint[] breakpoints = configuration.breakpoints();
        for (Breakpoint breakpoint : breakpoints) {
            String label = breakpoint.label();
            labels.add(label);
        }
        return labels;
    }

    public Breakpoint[] getBreakpoints() {
        return configuration.breakpoints();
    }
}
