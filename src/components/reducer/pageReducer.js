const INITIAL_STATE = {
    pages: [],
    limit: 5,
    page: null,
    publicPreview:null,
    privatePreview:null,
};


const applySetPages = (state, action) => ({
    ...state,
    pages: action.pages,
});

const applySetMessagesLimit = (state, action) => ({
    ...state,
    limit: action.limit,
});

const applySetPage = (state, action) => ({
    ...state,
    page: action.page,
});

const applySetPublicPagePreview = (state,action) =>({
    ...state,
    publicPreview:action.page
})

const applySetPrivatePagePreview = (state,action) =>({
    ...state,
    privatePreview:action.page
})

const pageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PAGES_SET':
            return applySetPages(state, action);

        case 'PAGES_LIMIT_SET':
            return applySetMessagesLimit(state, action);

        case 'EDIT_PAGE':
            return applySetPage(state, action);

        case 'SET_PUBLIC_PREVIEW':
            return applySetPublicPagePreview(state, action);

        case 'SET_PRIVATE_PREVIEW':
            return applySetPrivatePagePreview(state, action);

        default: return state;
    }
}

export default pageReducer;