package com.adobe.dx.visitor;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.AbstractResourceVisitor;
import org.apache.sling.api.resource.Resource;

public class ChildVisitor extends AbstractResourceVisitor {

    private String requiredResourceType;
    private List<String> componentsPaths = new ArrayList<>();

    public ChildVisitor(String resourceType) {
        this.requiredResourceType = resourceType;
    }

    public List<String> getComponentsPaths() {
        return componentsPaths;
    }

    public int getComponentCount() {
        return componentsPaths.size();
    }

    @Override
    protected void visit(Resource resource) {
        if (resource.isResourceType(this.requiredResourceType)) {
            componentsPaths.add(resource.getPath());
        }
    }
}