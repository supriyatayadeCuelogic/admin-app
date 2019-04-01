const pageReducer = (state = [], action) => {
    switch (action.type) {
        case 'EDIT_PAGE':
            return state.map((page) => page.uid === action.id ? { ...page } : page)
            break;

        default: return state;
    }
}

export default pageReducer;