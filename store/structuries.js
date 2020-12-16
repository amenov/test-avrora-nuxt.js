export const state = () => ({
  structuries: [
    { id: 1, parentId: null, name: "Алматы", persons: 0 },
    { id: 2, parentId: 1, name: "Центр 1", persons: 0 },
    { id: 3, parentId: 2, name: "Управление 1", persons: 5 },
    { id: 4, parentId: 3, name: "Отдел 1", persons: 10 },
    { id: 5, parentId: 3, name: "Отдел 2", persons: 15 },
    { id: 6, parentId: 2, name: "Управление 2", persons: 0 },
    { id: 7, parentId: 6, name: "Отдел 1", persons: 30 },
    { id: 8, parentId: 6, name: "Отдел 2", persons: 40 },

    { id: 9, parentId: null, name: "Нур-Султан", persons: 0 },
    { id: 10, parentId: 9, name: "Центр 1", persons: 0 },
    { id: 11, parentId: 10, name: "Управление 1", persons: 5 },
    { id: 12, parentId: 11, name: "Отдел 1", persons: 10 },
    { id: 13, parentId: 11, name: "Отдел 2", persons: 15 },
    { id: 14, parentId: 9, name: "Управление 2", persons: 0 },
    { id: 15, parentId: 14, name: "Отдел 1", persons: 30 },
    { id: 16, parentId: 14, name: "Отдел 2", persons: 40 }
  ]
});

export const mutations = {
  CREATE_STRUCTURE(state, data) {
    state.structuries = [...state.structuries, data];
  },
  UPDATE_STRUCTURE(state, data) {
    const structure = state.structuries.find(item => item.id === data.id);

    if (structure) {
      Object.assign(structure, data);
    }
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

    const result = structuries.filter(structure => {
      if (structure.parentId === null) {
        const createChildren = (structure, depth = 0, delimiter = "") => {
          structure.depth = depth += 1;
          structure.delimiter = depth > 1 ? (delimiter += "-") : delimiter;

          structure.children = structuries.filter(
            child => structure.id === child.parentId
          );

          structure.countPersons =
            structure.children.reduce((acc, child) => acc + child.persons, 0) +
            structure.persons;

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

    return result;
  }
};
