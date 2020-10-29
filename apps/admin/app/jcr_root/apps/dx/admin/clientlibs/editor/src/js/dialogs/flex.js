import React, { useState, useEffect } from 'react';
import Dialog from '@react/react-spectrum/Dialog';
import Provider from '@react/react-spectrum/Provider';
import { TabView, Tab } from '@react/react-spectrum/TabView';
import Underlay from '../../../../manager/src/js/ConfigManager/dialogs/Underlay';
import ResponsiveContent from './responsiveContent';

const FlexDialog = (props) => {
    const [config, setConfig] = useState({});
    const [currentTab, setCurrentTab] = useState();
    const [responsiveTabs, setResponsiveTabs] = useState([]);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const configPath = `${props.editable.path}.model.json`;
                const response = await fetch(configPath);
                const configRes = await response.json();
                setConfig(configRes);
            } catch (err) {
                console.error(err);
            }
        }
        fetchConfig();
    }, []);

    const onChange = (configToSet, tab) => {
        setConfig(configToSet);
        // This tells the tab if it needs to update the UI.
        setCurrentTab(tab);
    };

    const getResponsiveTabs = () => {
        return config.breakpoints.map((breakpoint) => {
            return (
                <Tab label={breakpoint.label} key={breakpoint.key}>
                    <ResponsiveContent
                        config={config}
                        tab={currentTab}
                        key={breakpoint.key}
                        onChange={onChange}
                        label={breakpoint.label}
                        suffix={breakpoint.suffix}
                    />
                </Tab>
            );
        });
    };

    if (config.breakpoints && responsiveTabs.length === 0) {
        setResponsiveTabs(getResponsiveTabs(config));
    }

    const destroyDialog = () => {
        const dialogContainer = window.document.querySelector('.dx-ReactDialogContainer');
        dialogContainer.remove();
    };

    const dialogConfirm = () => {
        props.editable.refresh();
        destroyDialog();
    };

    const dialogCancel = () => {
        destroyDialog();
    };

    return (
        <Provider theme="light">
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
