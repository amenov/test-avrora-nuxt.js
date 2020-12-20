import { structuries } from "./structuries.json";

export const state = () => ({
  structuries: structuries || [],
  loading: false
});

export const mutations = {
  CREATE_STRUCTURE(state, data) {
    state.structuries = [...state.structuries, data];
  },
  UPDATE_STRUCTURE(state, data) {
    const structure = state.structuries.find(item => item.id === data.id);

    if (structure) Object.assign(structure, data);
  },
  DESTROY_STRUCTURE(state, id) {
    state.structuries = state.structuries.filter(item => item.id !== id);
  }
};

export const actions = {
  createStructure({ commit, state }, data) {
    commit("CREATE_STRUCTURE", {
      id: state.structuries.length + 1,
      ...data
    });
  },
  updateStructure({ commit }, data) {
    commit("UPDATE_STRUCTURE", data);
  },
  destroyStructure({ commit }, id) {
    commit("DESTROY_STRUCTURE", id);
  }
};

export const getters = {
  structuries: state => {
    const structuries = JSON.parse(JSON.stringify(state.structuries));

    let result = [];

    if (structuries.length) {
      result = structuries.filter(structure => {
        if (structure.parentId === null) {
          const createChildren = (structure, depth = 0, delimiter = "") => {
            structure.depth = depth += 1;
            structure.delimiter = depth > 1 ? (delimiter += "-") : delimiter;

            structure.children = structuries.filter(
              child => structure.id === child.parentId
            );

            structure.countPersons =
              structure.children.reduce(
                (acc, child) => acc + child.persons,
                0
              ) + structure.persons;

            structure.countNested = structure.children.length;

            if (structure.children.length) {
              structure.children.forEach(child => {
                createChildren(child, depth, delimiter);

                structure.countPersons += child.children.reduce(
                  (acc, child) => acc + child.countPersons,
                  0
                );

                structure.countNested +=
                  child.children.length +
                  child.children.reduce(
                    (acc, child) => acc + child.countNested,
                    0
                  );
              });
            }
          };

          createChildren(structure);

          return structure;
        }
      });
    }

    return result;
  }
};
