import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import imageFluxo from '@/assets/img/admin/money-cash-svgrepo-com.svg'
import ImagePedido from '@/assets/img/admin/order-svgrepo-com.svg'
import ImageDocument from '@/assets/img/admin/document-svgrepo-com.svg'
import ImageUser from '@/assets/img/admin/users-svgrepo-com.svg'
import ImageTest from '@/assets/img/admin/test-svgrepo-com.svg'
import ImageEstoque from '@/assets/img/admin/inventorymajor-svgrepo-com.svg'
import ImageSystem from '@/assets/img/admin/dog-svgrepo-com.svg'
import ImageLogout from '@/assets/img/admin/logout-svgrepo-com.svg'
import ImageReturn from '@/assets/img/admin/arrow-back-svgrepo-com.svg'
import ImageMenu from '@/assets/img/admin/menuadmin.svg'

export const useNavBarAdminStore = defineStore('navbarAdminStore', () => {
  const isMobile = ref(false)
  const open = ref(false)
  const isDropdownOpen = ref(false)

  const router = useRouter()
  const route = useRoute()

  //NavbarAdminMenu.vue



  const menuSections = ref([
    {
      title: 'Sistema',
      items: [
        { label: 'Painel', to:('/dashboard/')},
        { label: 'Estoque', to:('/dashboard/estoque')},
        { label: 'Fluxo do Caixa', to:('/dashboard/fluxo')},
        { label: 'Pedidos', to:('/dashboard/pedidos')},
        { label: 'Usuários', to:('/dashboard/usuarios')},
        { label: 'Estatísticas', to:('/dashboard/estatisticas')},
      ]
    },
  ])

    function navigateTo(to) {
  open.value = false
  setTimeout(() => {
    router.push(to)
  }, 100)
}


  function isCurrent(path) {
    return route.path === path
  }

  //NavbarAdminUser.vue

  //NavbarDropdown.vue

    const dropdownSections = ref([
  {
    title: 'Usuário',
    items: [
      {
        label: 'Logout',
        icon: ImageLogout,
        event: 'logout'
      }
    ]
  },
  {
    title: 'Site',
    items: [
      {
        label: 'Voltar ao site',
        icon: ImageReturn,
        to: '/home' // modifique para o caminho correto do site
      }
    ]
  }
  ])

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  function openDropdown() {
    isDropdownOpen.value = true
  }

  function closeDropdown() {
    isDropdownOpen.value = false
  }

  //NavLateralAdmin.vue

  //NavLateralResponsive.vue

    function toggleMenu() {
    open.value = !open.value
  }

  function openMenu() {
    open.value = true
  }

  function closeMenu() {
    open.value = false
  }


  function checkIsMobile() {
    isMobile.value = window.innerWidth <= 1150
  }



  function initResizeListener() {
    onMounted(() => {
      checkIsMobile()
      window.addEventListener('resize', checkIsMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkIsMobile)
    })
  }

  return {
    isMobile,
    open,
    isDropdownOpen,
    menuSections,
    checkIsMobile,
    initResizeListener,
    toggleDropdown,
    openDropdown,
    closeDropdown,
    toggleMenu,
    openMenu,
    closeMenu,
    navigateTo,
    isCurrent,
    dropdownSections,
  }
})