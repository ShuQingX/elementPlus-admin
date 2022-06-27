import { defineComponent, computed, PropType } from 'vue';
import { ElIcon } from 'element-plus';
import * as ElementPlusIcons from '@element-plus/icons-vue';

interface IElementIcon {
  name: string;
  render: () => void;
  __file: string;
}

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: [String, Object] as PropType<Record<string, IElementIcon | any>>,
      default: ''
    }
  },
  setup(props) {
    const icons = Object.entries(ElementPlusIcons);

    const inElementIcon = icons.find(item => item[0] === props.icon.name);

    const isElementIcon = computed(() => (inElementIcon ? true : false));
    const icon = computed(() => (inElementIcon ? inElementIcon : props.icon));

    return () => (
      <ElIcon class={isElementIcon.value ? '' : `iconfont ${icon.value}`} size={20}>
        {isElementIcon.value ? (props.icon as Recordable).render() : ''}
      </ElIcon>
    );
  }
});
