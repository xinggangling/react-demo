import AsyncLoad from 'components/async_loader';
const PrintPreview = AsyncLoad(() => import('./print_preview'));
const ImageCreator = AsyncLoad(() => import('./image_creator'));
const IdentifyPicture = AsyncLoad(() => import('./identify_picture'));
import Iframe from './iframe';

export {
  PrintPreview,
  ImageCreator,
  IdentifyPicture,
  Iframe,
}
