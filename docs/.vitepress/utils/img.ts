import { defineClientComponent } from 'vitepress';
import { defineComponent, h } from 'vue';
import type { NImage as NImageT } from 'naive-ui/es/image';

const mirrorHost = () => {
  return `https://registry.npmmirror.com/@gkd-kit/assets/${ASSETS_VERSION}/files/assets/`;
};
const imgHost = 'https://a.gkd.li/';

export const convertSrc = (name: string): string => {
  if (name && name.startsWith('https:')) {
    if (name.startsWith(imgHost)) {
      return mirrorHost() + name.slice(imgHost.length);
    }
    return name;
  }
  return mirrorHost() + name;
};

export const GImg = defineComponent<{
  src: string;
  width?: number | string;
}>(
  (props) => {
    return () => {
      return h(NImage, {
        src: convertSrc(props.src),
        width: props.width,
      });
    };
  },
  {
    props: ['src', 'width'],
  },
);


export const NImage = defineClientComponent(() => {
  return import('naive-ui/es/image').then((mod) => {
    return mod.NImage;
  });
}) as unknown as typeof NImageT;