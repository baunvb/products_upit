export const createAction = actionName => ({
  NAME: actionName,
	LOADING: `${actionName}_LOADING`,
	SUCCESS: `${actionName}_SUCCESS`,
	ERROR: `${actionName}_ERROR`
});
