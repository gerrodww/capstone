import { csrfFetch } from './csrf';

//Constants
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

const editUser = (user) => ({
    type: EDIT_USER,
    payload: user
});




export const thunkAuthenticate = () => async (dispatch) => {
    try{
        const response = await csrfFetch("/api/restore-user");
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
        }
    } catch (e){
        return e
    }
};

export const thunkLogin = (credentials) => async dispatch => {
    
    
    try {
        const {email, password} = credentials
        const response = await csrfFetch("/api/session", {
            method: "POST",
            body: JSON.stringify({credential: email, password})
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data.user));
            return data
        } else if (response.status !== 200) {
            throw response
        }
        } catch (error) {
        const errorMessages = await error.json();
        return errorMessages
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    
    try {
        const response = await csrfFetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
    
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data.user));
            return data
        } else if (response.status !== 200) {
            throw response
        } 
        
    } catch (error) {
        const errorMessages = await error.json();
        return errorMessages
    }
};

export const thunkLogout = () => async (dispatch) => {
    await csrfFetch("/api/session", {
        method: "DELETE",
    });
    dispatch(removeUser());
};

export const updateUserThunk = (userId, form) => async (dispatch) => {
    const { image, username, bio, darkMode, previewUrl } = form
    try {
        const formData = new FormData();

        formData.append('userId', userId);
        formData.append('image', image);
        formData.append('username', username);
        formData.append('bio', bio);
        formData.append('darkMode', darkMode);
        formData.append('previewUrl', previewUrl);

        const res = await csrfFetch(`/api/users/edit${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: formData
        });
        
        if (res.ok) {
            const user = await res.json();
            dispatch(editUser(user));
        } else if (res.status < 500) {
            const data = await res.json();
            if (data.errors) {
                return data
            } else {
                throw new Error('An error occurred. Please try again.')
            }
        }
    } catch (e) {
        return e
    }
}


const initialState = { user: null };

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        case EDIT_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default sessionReducer;
