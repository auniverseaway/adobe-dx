import { useState, useEffect } from 'react';
import { TabView, Tab } from '@react/react-spectrum/TabView';
import Select from '@react/react-spectrum/Select';
// import Textfield from '@react/react-spectrum/Textfield';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const DragHandle = sortableHandle(() => (
    <button type="button" className="dx-Multifield-dragButton">
        <coral-icon
            size="S"
            className="_coral-Icon--sizeS _coral-Icon"
            role="img"
            icon="moveUpDown"
            autoarialabel="on"
            aria-label="Move Up or Down"
        >
            <svg focusable="false" aria-hidden="true" class="_coral-Icon--svg _coral-Icon">
                <use xlinkHref="/libs/clientlibs/granite/coralui3/resources/spectrum-icons.svg#spectrum-icon-18-MoveUpDown" />
            </svg>
        </coral-icon>
    </button>
));

const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="coral--light coral-Well dx-Multifield">{children}</ul>;
});

const convertToArray = (definitions) => {
    let itemsToSet = [];
    if (definitions) {
        itemsToSet = Object.keys(definitions).reduce((defs, key) => {
            if (key !== 'jcr:primaryType') {
                definitions[key].itemName = key;
                defs.push(definitions[key]);
            }
            return defs;
        }, []);
    }
    return itemsToSet;
};

const ResponsiveContent = (props) => {
    const [items, setItems] = useState([]);

    const { tab, key } = props;
    const definitions = props.config.resource[`definitions${props.suffix}`];

    useEffect(() => {
        if (definitions || tab === key) {
            setItems(convertToArray(definitions));
            props.onChange(props.config, null);
        }
    }, [definitions, tab]);

    const tabviewLabel = `${props.label} TabView`;

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };

    const onSelectChange = (val, field) => {
        props.config.resource[`definitions${props.suffix}`][field.item][field.name] = val;
        props.onChange(props.config, key);
    };

    const SortableItem = sortableElement(({ value }) => (
        <li className="dx-Multifield-item">
            <Select
                name="width"
                value={value.width}
                onChange={(selectVal) =>
                    onSelectChange(selectVal, { name: 'width', item: value.itemName })
                }
                options={props.config.widths}
            />
            <DragHandle />
        </li>
    ));

    const sortableItems = items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
    ));

    return (
        <TabView
            aria-label={tabviewLabel}
            orientation="vertical"
            className="dx-FlexDialog--ResponsiveTabView"
        >
            <Tab label="Items">
                <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                    {sortableItems}
                </SortableContainer>
            </Tab>
            <Tab label="Layout">
                <h2>Suffix: {props.suffix}</h2>
            </Tab>
            <Tab label="Spacing">
                <h2>Suffix: {props.suffix}</h2>
            </Tab>
            <Tab label="Foreground">
                <h2>Suffix: {props.suffix}</h2>
            </Tab>
            <Tab label="Background">
                <h2>Suffix: {props.suffix}</h2>
            </Tab>
        </TabView>
    );
};

export default ResponsiveContent;
