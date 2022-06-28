import { defineComponent } from 'vue';
import { ElSwitch } from 'element-plus';
import Icon from '@/components/common/Icon';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const activeIcon = () => <Icon icon="icon-wb_sunny" />;
    const inactiveIcon = () => <Icon icon="icon-dark" />;

    return () => (
      <ElSwitch
        size="large"
        modelValue={props.modelValue}
        onChange={$event => emit('update:modelValue', $event)}
        inline-prompt
        active-icon={activeIcon}
        inactive-icon={inactiveIcon}
        {...{ attrs }}
      ></ElSwitch>
    );
  }
});
