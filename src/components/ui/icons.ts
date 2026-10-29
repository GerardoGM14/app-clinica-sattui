// Icon registry. Only the icons listed here end up in the build.
// Source: Phosphor Icons (regular weight unless noted), the set used in the Figma design.
import arrowUpRight from '@phosphor-icons/core/assets/regular/arrow-up-right.svg?raw';
import bank from '@phosphor-icons/core/assets/regular/bank.svg?raw';
import calendarBlank from '@phosphor-icons/core/assets/regular/calendar-blank.svg?raw';
import caretDown from '@phosphor-icons/core/assets/regular/caret-down.svg?raw';
import caretLeft from '@phosphor-icons/core/assets/regular/caret-left.svg?raw';
import caretRight from '@phosphor-icons/core/assets/regular/caret-right.svg?raw';
import checkCircleFill from '@phosphor-icons/core/assets/fill/check-circle-fill.svg?raw';
import facebookLogo from '@phosphor-icons/core/assets/regular/facebook-logo.svg?raw';
import hospitalLight from '@phosphor-icons/core/assets/light/hospital-light.svg?raw';
import instagramLogo from '@phosphor-icons/core/assets/regular/instagram-logo.svg?raw';
import list from '@phosphor-icons/core/assets/regular/list.svg?raw';
import phoneCall from '@phosphor-icons/core/assets/regular/phone-call.svg?raw';
import shieldCheckLight from '@phosphor-icons/core/assets/light/shield-check-light.svg?raw';
import tiktokLogo from '@phosphor-icons/core/assets/regular/tiktok-logo.svg?raw';
import videoCamera from '@phosphor-icons/core/assets/regular/video-camera.svg?raw';
import x from '@phosphor-icons/core/assets/regular/x.svg?raw';
import xCircleFill from '@phosphor-icons/core/assets/fill/x-circle-fill.svg?raw';

export const icons = {
  'arrow-up-right': arrowUpRight,
  bank,
  'calendar-blank': calendarBlank,
  'caret-down': caretDown,
  'caret-left': caretLeft,
  'caret-right': caretRight,
  'check-circle-fill': checkCircleFill,
  'facebook-logo': facebookLogo,
  'hospital-light': hospitalLight,
  'instagram-logo': instagramLogo,
  list,
  'phone-call': phoneCall,
  'shield-check-light': shieldCheckLight,
  'tiktok-logo': tiktokLogo,
  'video-camera': videoCamera,
  x,
  'x-circle-fill': xCircleFill,
};

export type IconName = keyof typeof icons;
