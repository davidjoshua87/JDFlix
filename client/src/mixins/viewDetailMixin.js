const viewDetailMixin = (id, type) => {
  try {
    this.$store.dispatch('getItem', { id, type });
    this.$emit('open-modal');
  } catch (e) {
    this.error = e;
  }
};
export default { viewDetailMixin };
