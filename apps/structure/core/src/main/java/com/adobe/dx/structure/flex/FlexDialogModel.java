package com.adobe.dx.structure.flex;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import com.adobe.dx.responsive.Breakpoint;
import com.adobe.dx.responsive.ResponsiveConfiguration;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.caconfig.ConfigurationBuilder;
import org.apache.sling.caconfig.resource.ConfigurationResourceResolver;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(
    adaptables = { SlingHttpServletRequest.class },
    resourceType = "dx/structure/components/flex"
)
@Exporter(name = "jackson", extensions = "json")
public class FlexDialogModel {

    private final static String FLEX_PREFIX = "com.adobe.dx.styleguide.StyleGuide/jcr:content/components/flexContainer/";
    
    @Self
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resolver;

    @SlingObject
    private Resource resource;

    private ResponsiveConfiguration resConfiguration;

    @OSGiService
    private ConfigurationResourceResolver configResolver;

    @PostConstruct
    void init() {
        ConfigurationBuilder builder = resource.adaptTo(ConfigurationBuilder.class);
        if (builder != null) {
            resConfiguration = builder.as(ResponsiveConfiguration.class);
        }
    }

    public List<Map<String, String>> getBreakpoints() {
        List<Map<String, String>> breakpoints = new ArrayList<Map<String, String>>();
        Breakpoint[] configs = resConfiguration.breakpoints();
        for (Breakpoint breakpoint : configs) {
            Map<String, String> map = new LinkedHashMap<String, String>();
            map.put("label", breakpoint.label());
            map.put("suffix", breakpoint.propertySuffix());
            map.put("key", breakpoint.key());

            breakpoints.add(map);
        }
        return breakpoints;
    }

    public Collection<Resource> getWidths() {
        return getFlexOptions(FLEX_PREFIX + "widths");
    }

    private Collection<Resource> getFlexOptions(String configName) {
        return configResolver.getResourceCollection(resource, "sling:configs", configName);
    }

    public Resource getResource() {
        return resource;
    }
}
