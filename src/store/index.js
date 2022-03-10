import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    isAdmin: false,
    users: [],
    currentUser: Object,
    userLogged: Object,
    projects: [],
    currentProject: Object,
    techSet: [],
    messageError: "",
  },
  getters: {
    getIsLogged: (state) => {
      return state.isLogged;
    },
    getIsAdmin: (state) => {
      return state.isAdmin;
    },
    getUsers: (state) => {
      return state.users;
    },
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getProjects: (state) => {
      return state.projects;
    },
    getCurrentProject: (state) => {
      return state.currentProject;
    },
    getTechSet: (state) => {
      return state.techSet;
    },
    getErrorMessage: (state) => {
      return errorMessage;
    },
  },
  mutations: {
    setUserLogged(state, user) {
      state.isLogged = true;
      state.userLogged = user;
      if (user.admin === true) state.admin = true;
    },
    setIsAdmin(state, userAdmin) {},
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setProjects(state, data) {
      state.projects = data.projects;
    },
    setCurrentProject(state, project) {
      state.currentProject = project;
    },
    setTechSet(state, techSet) {
      state.techSet = techSet;
    },
    setErrorMessage(state, message) {
      state.setErrorMessage = message;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const response = await axios.get(
          "https://6227da469fd6174ca814fdc5.mockapi.io/api/users"
        );
        if (response.error) {
          throw response.error;
        }
        commit("setUsers", response.data);
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    async getUserById({ commit }, id) {
      try {
        const response = await axios.get(
          `https://6227da469fd6174ca814fdc5.mockapi.io/api/users/${id}`
        );
        if (response.error) {
          throw response.error;
        }
        commit("setCurrentUser", response.data);
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    async setNewUser({ dispatch, commit }, user) {
      try {
        const response = await axios.post(
          "https://6227da469fd6174ca814fdc5.mockapi.io/api/users/",
          {
            name: user.name,
            password: user.password,
            email: user.email,
          }
        );
        if (response.error) {
          throw response.error;
        }
        setTimeout(() => {
          dispatch("getUsers"), 2000;
        });
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    async deleteUser({ dispatch, commit }, id) {
      try {
        const response = await axios.delete(
          `https://6227da469fd6174ca814fdc5.mockapi.io/api/users/${id}`
        );
        if (response.error) {
          throw response.error;
        }
        dispatch("getUsers");
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    async getProjects({ commit }) {
      try {
        const response = await axios.get(
          "https://6227da469fd6174ca814fdc5.mockapi.io/api/projects"
        );
        if (response.error) {
          throw response.error;
        }
        commit("setProjects", response.data);
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    async getProjectById({ commit }, id) {
      try {
        const response = axios.get(
          `https://6227da469fd6174ca814fdc5.mockapi.io/api/projects/${id}`
        );
        if (response.error) {
          throw response.error;
        }
        commit("setCurrentProject", response.data);
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    async setNewProject({ dispatch, commit }, project) {
      try {
        const response = axios.post(
          "https://6227da469fd6174ca814fdc5.mockapi.io/api/projects/",
          { project }
        );
        if (response.error) {
          throw response.error;
        }
        setTimeout(() => {
          dispatch("getProjects"), 2000;
        });
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    updateProject({ dispatch, commit }, project) {
      try {
        const response = axios.put(
          "https://6227da469fd6174ca814fdc5.mockapi.io/api/projects",
          {
            project,
          }
        );
        if (response.error) {
          throw response.error;
        }
        setTimeout(() => {
          dispatch("getUsers", 2000);
        });
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    deleteProject({ dispatch }, id) {},
    async getTechSet({ commit }) {
      try {
        const response = await axios.get("API/getTech");
        if (response.error) {
          throw response.error;
        }
        commit("setTechSet", response.data);
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
      }
    },
    async logIn({ commit }, login) {
      try {
        const response = axios.post(
          "https://6227da469fd6174ca814fdc5.mockapi.io/api/users/",
          {
            user: login.email,
            password: login.password,
          }
        );
        if (response.error) {
          throw response.error;
        }
        commit("setUser", login);
      } catch (e) {
        commit("setErrorMessage", { error: `${e.message}` });
        // Redirect goBack(-1)
      }
    },
    uploadDocument({ dispatch }, document) {},
    downloadDocument(url) {},
  },
  modules: {},
});
