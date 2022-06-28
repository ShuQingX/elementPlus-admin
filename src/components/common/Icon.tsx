import { defineComponent, computed } from 'vue';
import { ElIcon } from 'element-plus';
import * as ElementPlusIcons from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: [String, Object],
      default: ''
    }
  },
  setup(props) {
    const icons = Object.entries(ElementPlusIcons);

    const inElementIcon = icons.find(item => item[0] === (props.icon as any).name);

    const isElementIcon = computed(() => (inElementIcon ? true : false));
    const icon = computed(() => (inElementIcon ? inElementIcon : props.icon));

    return () => (
      <ElIcon class={isElementIcon.value ? '' : `iconfont ${icon.value}`} size={20}>
        {isElementIcon.value ? (props.icon as Recordable).render() : ''}
      </ElIcon>
    );
  }
});
