/*
 *  Copyright 2020 Adobe
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FlexDialog from '../dialogs/flex';

const flexToolbar = ($, ns, $document) => {
    if (!ns) return;

    /**
     *
     * Dependencies
     *
     */

    const { EditorFrame } = ns;

    /**
     *
     * Constants
     *
     */

    const ACTION_ICON = 'wrench';
    const ACTION_TITLE = 'Configure';
    const ACTION_NAME = 'CONFIGURE_REACT';
    const RT_DX_PARLITE = 'dx/structure/components/flex';

    const showDialog = async (editable) => {
        const body = document.querySelector('body');
        const dialogContainer = document.createElement('div');
        dialogContainer.classList.add('dx-ReactDialogContainer');
        body.appendChild(dialogContainer);
        ReactDOM.render(<FlexDialog editable={editable} />, dialogContainer);
    };

    const showHideAction = new ns.ui.ToolbarAction({
        name: ACTION_NAME,
        icon: ACTION_ICON,
        text: ACTION_TITLE,
        order: 'before CONFIGURE',
        execute: (editable) => {
            showDialog(editable);
        },
        condition: (editable) => {
            return editable.type === RT_DX_PARLITE;
        },
        isNonMulti: true,
    });

    // When the Edit Layer gets activated
    $document.on('cq-layer-activated', (event) => {
        if (event.layer === 'Edit' || event.layer === 'structure' || event.layer === 'initial') {
            showDialog(ns.editables[7]);
            const toolbarActions = EditorFrame.editableToolbar.config.actions;
            if (!toolbarActions[ACTION_NAME]) {
                // Register an additional action
                EditorFrame.editableToolbar.registerAction(ACTION_NAME, showHideAction);
            } else {
                console.log('already registered');
            }
        }
    });
};

export default flexToolbar;
