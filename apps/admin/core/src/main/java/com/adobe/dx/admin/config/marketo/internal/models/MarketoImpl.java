package com.adobe.dx.admin.config.marketo.internal.models;

import java.util.HashMap;

import javax.annotation.PostConstruct;

import com.adobe.dx.admin.config.marketo.models.Marketo;
import com.adobe.dx.visitor.ChildVisitor;
import com.day.cq.wcm.api.Page;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.apache.sling.caconfig.resource.ConfigurationResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Model(adaptables = { SlingHttpServletRequest.class }, adapters = { Marketo.class })
public class MarketoImpl implements Marketo {

    private static final String BUCKET_NAME = "settings/cloudconfigs";

    private static final String CONFIG_NAME = "marketo-config";

    @Self
    private SlingHttpServletRequest request;

    @ScriptVariable
    private Page currentPage;

    @OSGiService
    private ConfigurationResourceResolver configurationResolver;

    private ValueMap configProps;

    @PostConstruct
    public void postConstruct() {
        configProps = getConfigProps();
    }

    @Override
    public String getBaseUrl() {
        return configProps.get("baseUrl", String.class);
    }

    @Override
    public String getMunchkinId() {
        return configProps.get("munchkinId", String.class);
    }

    private ValueMap getConfigProps() {
        Resource resource = currentPage.getContentResource();
        Resource configResource = configurationResolver.getResource(resource, BUCKET_NAME, CONFIG_NAME);
        if (configResource != null) {
            Page configPage = configResource.adaptTo(Page.class);
            if (configPage != null) {
                return configPage.getProperties();
            }
        }
        return new ValueMapDecorator(new HashMap<>());
    }

    @Override
    public boolean hasForms() {
        // ChildVisitor visitor = new ChildVisitor(RT_XF_REFERENCE);
        // visitor.accept(resource);

        // List<String> xfComponentsPaths = visitor.getComponentsPaths();
        // Set<String> referencesPaths = new HashSet<>();
        return false;
    }
}