package com.adobe.dx.admin.components.cacolorfield;

import com.adobe.dx.admin.datasource.internal.ContextAwareDatasource;
import com.adobe.granite.ui.components.Config;
import com.adobe.granite.ui.components.Field;
import com.adobe.granite.ui.components.ds.DataSource;
import com.day.util.UUID;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.commons.collections4.IteratorUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(adaptables = { SlingHttpServletRequest.class },
       defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CaColorfieldModel {

    @Self
    private SlingHttpServletRequest request;

    @SlingObject
    private ResourceResolver resourceResolver;

    private Iterator<Resource> items;

    private String name;
    private String fieldLabel;
    private String fieldDesc;
    private String placeholder;
    private boolean disabled;
    private boolean required;
    private String labelId;
    private String labeledBy;
    private String descriptionId;
    private String variant;
    private String autoGenerateColors;
    private boolean showSwatches;
    private String showSwatchesCoralized;
    private boolean showProperties;
    private String showPropertiesCoralized;
    private boolean showDefaultColors;
    private String showDefaultColorsCoralized;
    private String validation;

    @PostConstruct
    private void init() {
        Resource componentResource = request.getResource();

        // Setup basics
        final Config cfg = new Config(componentResource);
        ValueMap vm = (ValueMap) request.getAttribute(Field.class.getName());
        String uuid = UUID.create().toString();

        // Get the DataSource
        request.adaptTo(ContextAwareDatasource.class);
        DataSource ds = (DataSource) request.getAttribute(DataSource.class.getName());
        if (ds != null) {
            items = ds.iterator();
        }

        // Get Component Props
        name = cfg.get("name", String.class);
        fieldLabel = cfg.get("fieldLabel", String.class);
        fieldDesc = cfg.get("fieldDescription", String.class);
        placeholder = cfg.get("emptyText", String.class);
        disabled = cfg.get("disabled", false);
        required = cfg.get("required", false);
        labelId = "label_" + uuid;
        descriptionId = "description_" + uuid;
        labeledBy = labelId + " " + descriptionId;
        variant = cfg.get("variant", "default");
        autoGenerateColors = cfg.get("autogenerateColors", "off");
        showSwatches = cfg.get("showSwatches", true);
        showSwatchesCoralized = showSwatches ? "on" : "off";
        showProperties = cfg.get("showProperties", true);
        showPropertiesCoralized = showProperties ? "on" : "off";
        showDefaultColors = cfg.get("showDefaultColors", true);
        showDefaultColorsCoralized = showDefaultColors ? "on" : "off";
        validation = StringUtils.join(cfg.get("validation", new String[0]), " ");
    }

    public List<Resource> getItems() {
        if (items != null) {
            return IteratorUtils.toList(items);
        }
        return Collections.emptyList();
    }



    // Config cfg = cmp.getConfig();
    // Tag tag = cmp.consumeTag();
    // AttrBuilder attrs = tag.getAttrs();
    // cmp.populateCommonAttrs(attrs);

    // 
    // attrs.add("value", vm.get("value", String.class));

    // attrs.add("name", cfg.get("name", String.class));
    // attrs.add("placeholder", i18n.getVar(cfg.get("emptyText", String.class)));
    // attrs.addDisabled();
    // attrs.addBoolean("required", );
    // attrs.add("labelledby", );

    // attrs.add("variant", );
    // attrs.add("autoGenerateColors", );

    // boolean showSwatches = 
    // attrs.add("showSwatches", showSwatches ? "on" : "off");

    // boolean showProperties = cfg.get("showProperties", true);
    // attrs.add("showProperties", showProperties ? "on" : "off");

    // boolean showDefaultColors = cfg.get("showDefaultColors", true);
    // attrs.add("showDefaultColors", showDefaultColors ? "on" : "off");

    // String validation = StringUtils.join(cfg.get("validation", new String[0]), " ");
    // attrs.add("data-foundation-validation", validation);
    // attrs.add("data-validation", validation);

    // Iterator<Resource> items = cmp.getItemDataSource().iterator();
}
