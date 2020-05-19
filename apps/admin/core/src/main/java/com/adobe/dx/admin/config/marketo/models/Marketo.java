package com.adobe.dx.admin.config.marketo.models;

import com.drew.lang.annotations.NotNull;

import org.osgi.annotation.versioning.ProviderType;

@ProviderType
public interface Marketo {
    @NotNull
    String getBaseUrl();

    @NotNull
    String getMunchkinId();

    @NotNull
    boolean hasForms();
}