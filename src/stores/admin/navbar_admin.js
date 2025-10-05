import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import imageBone from '@/assets/img/admin/bone-svgrepo-com.svg'
import ImageLamina from '@/assets/img/admin/microscope-svgrepo-com.svg'
import ImageDocument from '@/assets/img/admin/document-svgrepo-com.svg'
import ImageUser from '@/assets/img/admin/users-svgrepo-com.svg'
import ImageTest from '@/assets/img/admin/test-svgrepo-com.svg'
import ImagePet from '@/assets/img/admin/pet-svgrepo-com.svg'
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
      title: 'Portal',
      items: [
        { label: 'Geral', icon: ImageMenu, to:('')},
        { label: 'Órgãos', icon: imageBone, to:('')},
        { label: 'Lâminas', icon: ImageLamina, to:('')},
        { label: 'Espécies', icon: ImagePet, to:('')},
        { label: 'Sistemas', icon: ImageSystem, to:('')}
      ]
    },
    // {
    //   title: 'Usuários',
    //   items: [
    //     { label: 'Usuários', icon: ImageUser, to: '/admin/users' }
    //   ]
    // },
    {
      title: 'Quiz',
      items: [
        { label: 'Perguntas', icon: ImageTest, to: '' }
      ]
    },
    {
      title: 'Material de Suporte',
      items: [
        { label: 'Conteúdos', icon: ImageDocument, to: '' }
      ]
    }
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
        to: '' // modifique para o caminho correto do site
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