import type { ComponentProp } from '../types/ComponentProp';

export interface Component {
  name: string;
  type: string;
  description: string;
  props: ComponentProp[];
  dependencies: string[];
  example: string;
  source: string;
}

export interface ComponentSection {
  section: string;
  components: Component[];
}