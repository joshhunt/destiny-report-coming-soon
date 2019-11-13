import { extend as applyThree } from 'react-three-fiber'
import { apply as applySpring } from 'react-spring/three'

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from './postprocessing/RenderPass'
import { GlitchPass } from './postprocessing/GlitchPass'

applySpring({ EffectComposer, RenderPass, GlitchPass })
applyThree({ EffectComposer, RenderPass, GlitchPass })
