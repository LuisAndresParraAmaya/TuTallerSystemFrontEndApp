export default {
  methods: {
    goToModifyAccountPage() {
      this.$navigator.navigate('/ModifyAccount', { frame: 'accountNav', backstackVisible: false })
    },
    goToModifyPasswordPage() {
      this.$navigator.navigate('/ModifyPassword', { frame: 'accountNav', backstackVisible: false })
    },
    goToDeleteAccountPage() {
      this.$navigator.navigate('/DeleteAccount', { frame: 'accountNav', backstackVisible: false })
    },
    goToPreviousPage() {
      this.$navigateBack()
    }
  }
}