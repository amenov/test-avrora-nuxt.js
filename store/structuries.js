export const state = () => ({
  structuries: [
    { id: 1, parentId: null, name: "Алматы", persons: 0 },
    { id: 2, parentId: 1, name: "Центр 1", persons: 0 },
    { id: 3, parentId: 2, name: "Управление 1", persons: 5 },
    { id: 4, parentId: 3, name: "Отдел 1", persons: 10 },
    { id: 5, parentId: 3, name: "Отдел 2", persons: 15 },
    { id: 6, parentId: 2, name: "Управление 2", persons: 0 },
    { id: 7, parentId: 6, name: "Отдел 1", persons: 30 },
    { id: 8, parentId: 6, name: "Отдел 2", persons: 40 }
  ]
});

export const mutations = {
  SET_STRUCTURIES(state, payload) {
    state.structuries = [...state.structuries, payload];
  }
};

export const actions = {
  createStructure({ commit, state }, payload) {
    commit("SET_STRUCTURIES", {
      id: state.structuries.length + 1,
      ...payload
    });
  }
};

export const getters = {
  getStructuries: state => {
    const structuries = JSON.parse(JSON.stringify(state.structuries));

    const result = structuries.filter(structure => {
      if (structure.parentId === null) {
        const createChildren = (structure, depth = 0) => {
          structure.depth = depth += 1;

          structure.children = structuries.filter(
            child => structure.id === child.parentId
          );

          structure.countPersons =
            structure.children.reduce((acc, child) => acc + child.persons, 0) +
            structure.persons;

          structure.countNested = structure.children.length;

          if (structure.children.length) {
            structure.children.forEach(child => {
              createChildren(child, depth);

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
