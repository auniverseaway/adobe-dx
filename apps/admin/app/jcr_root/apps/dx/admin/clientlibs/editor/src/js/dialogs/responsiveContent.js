import { TabView, Tab } from '@react/react-spectrum/TabView';

const ResponsiveContent = (props) => {
    const tabviewLabel = `${props.label} TabView`;

    return (
        <TabView
            aria-label={tabviewLabel}
            orientation="vertical"
            className="dx-FlexDialog--ResponsiveTabView"
        >
            <Tab label="Items">
                <h2>Prefix: {props.prefix}</h2>
            </Tab>
            <Tab label="Layout">
                <h2>Prefix: {props.prefix}</h2>
            </Tab>
            <Tab label="Spacing">
                <h2>Prefix: {props.prefix}</h2>
            </Tab>
            <Tab label="Foreground">
                <h2>Prefix: {props.prefix}</h2>
            </Tab>
            <Tab label="Background">
                <h2>Prefix: {props.prefix}</h2>
            </Tab>
        </TabView>
    );
};

export default ResponsiveContent;
