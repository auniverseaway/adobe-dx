import React, { useState, useEffect } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Dialog from '@react/react-spectrum/Dialog';
import Provider from '@react/react-spectrum/Provider';
import { TabView, Tab } from '@react/react-spectrum/TabView';
import Underlay from '../../../../manager/src/js/ConfigManager/dialogs/Underlay';
import ResponsiveContent from './responsiveContent';
import fetchConfig from './fetchConfig';
import getCsrf from '../../../../manager/src/js/ConfigManager/utils/csrf';

const getPathAndName = (fullPath) => {
    const parts = fullPath.split('/');
    const name = parts.pop();
    const path = parts.join('/');
    return { path, name };
};

const FlexDialog = (props) => {
    const [config, setConfig] = useState({});
    const [currentTab, setCurrentTab] = useState();
    const [responsiveTabs, setResponsiveTabs] = useState([]);

    const { path } = props.editable;

    useEffect(() => {
        fetchConfig(path, setConfig);
    }, []);

    const onChange = (configToSet, tab) => {
        setConfig(configToSet);
        setCurrentTab(tab);
    };

    const getResponsiveTabs = () => {
        return config.breakpoints.map((breakpoint) => {
            return (
                <Tab label={breakpoint.label} key={breakpoint.key}>
                    <ResponsiveContent
                        config={config}
                        tab={currentTab}
                        bKey={breakpoint.key}
                        onChange={onChange}
                        label={breakpoint.label}
                        suffix={breakpoint.suffix}
                    />
                </Tab>
            );
        });
    };

    if ((config && config.breakpoints && responsiveTabs.length === 0) || currentTab) {
        setResponsiveTabs(getResponsiveTabs(config));
        setCurrentTab(null);
    }

    const destroyDialog = () => {
        unmountComponentAtNode(document.querySelector('.dx-Provider--dialog'));
        const dialogContainer = window.document.querySelector('.dx-ReactDialogContainer');
        dialogContainer.remove();
    };

    const dialogConfirm = async () => {
        const urlParts = getPathAndName(path);

        const formData = new FormData();
        formData.append(':operation', 'import');
        formData.append(':contentType', 'json');
        formData.append(':replace', true);

        formData.append(':name', urlParts.name);
        formData.append(':content', JSON.stringify(config.resource));

        const csrf = await getCsrf();

        await fetch(urlParts.path, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'CSRF-Token': csrf.token },
            body: formData,
        });

        props.editable.refresh();
        destroyDialog();
    };

    const dialogCancel = () => {
        destroyDialog();
    };

    return (
        <Provider theme="light" className="dx-Provider--dialog">
            <Underlay open />
            <Dialog
                open
                onConfirm={dialogConfirm}
                onCancel={dialogCancel}
                title="Flex Container"
                confirmLabel="Save"
                cancelLabel="Cancel"
                className="dx-FlexDialog"
            >
                <TabView aria-label="Default" autoFocus={false} collapsible={false}>
                    {responsiveTabs}
                    <Tab label="General">General Content</Tab>
                </TabView>
            </Dialog>
        </Provider>
    );
};

export default FlexDialog;
