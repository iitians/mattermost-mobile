// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Fuse from 'fuse.js';

import {addReactionToLatestPost} from '@actions/views/emoji';
import {autocompleteCustomEmojis} from '@mm-redux/actions/emojis';
import {getConfig} from '@mm-redux/selectors/entities/general';
import {getTheme} from '@mm-redux/selectors/entities/preferences';
import {selectEmojisByName} from '@selectors/emojis';

import EmojiSuggestion from './emoji_suggestion';

function mapStateToProps(state) {
    const emojis = selectEmojisByName(state);
    const options = {
        shouldSort: false,
        threshold: 0.3,
        location: 0,
        distance: 10,
        includeMatches: true,
        findAllMatches: true,
    };

    const list = emojis.length ? emojis : [];
    const fuse = new Fuse(list, options);

    return {
        fuse,
        emojis,
        customEmojisEnabled: getConfig(state).EnableCustomEmoji === 'true',
        theme: getTheme(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addReactionToLatestPost,
            autocompleteCustomEmojis,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiSuggestion);
