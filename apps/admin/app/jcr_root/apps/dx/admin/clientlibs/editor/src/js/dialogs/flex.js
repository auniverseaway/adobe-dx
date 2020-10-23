import React from 'react';
import Dialog from '@react/react-spectrum/Dialog';
import Provider from '@react/react-spectrum/Provider';
import { TabView, Tab } from '@react/react-spectrum/TabView';
import Underlay from '../../../../manager/src/js/ConfigManager/dialogs/Underlay';
import ResponsiveContent from './responsiveContent';

const FlexDialog = (props) => {
    props.editable.path;

    const resProps = [
        { label: 'Mobile', prefix: '' },
        { label: 'Tablet', prefix: 'tablet' },
        { label: 'Desktop', prefix: 'desktop' },
    ];

    const responsiveTabs = resProps.map((res) => {
        return (
            <Tab label={res.label} key={res.prefix}>
                <ResponsiveContent label={res.label} prefix={res.prefix} />
            </Tab>
        );
    });

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
