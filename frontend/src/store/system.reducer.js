const initialState = {
    view: null, // dispatch on eac View CMP cdn 
    isDarkMode: false, // By-User
    userActivity: [], // track user actions
    title: document.title
}

export function systemReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        case 'UPDATE_VIEW':
            newState = { ...state, view: action.view }
            break

        case 'TOGGLE_DARK_MOOD':
            newState = { ...state, isDarkMode: !state.isDarkMode }
            break

        case 'ADD_USER_ACTIVITY':
            newState = { ...state, userActivity: [...state.userActivity, action.event] }
            break

        case 'CLEAR_USER_ACTIVITY':
            newState = { ...state, userActivity: [] }
            break
        case 'SET_TITLE':
            newState = { ...state, title: action.title }
            break

        default:
    }
    window.gSystemState = newState
    return newState
}