import { Log } from '@modules/logger';
import { UI } from '@modules/ui';
import { Permission } from '@modules/permission';
import { PERMISSIONS } from '@shared/permission';

const UI_COMPONENT_NAME = 'menu';

let _displaying: boolean;

const getPlayerPedId = (): number => PlayerPedId();

const display = (): void => {
  if (_displaying) return;

  if (!Permission.isAllowed(PERMISSIONS.MENU)) return;

  UI.display(UI_COMPONENT_NAME);
  UI.focus(true, true);

  _displaying = true;
};

const hide = (): void => {
  if (!_displaying) return;

  UI.hide(UI_COMPONENT_NAME);
  UI.focus(false, false);

  _displaying = false;
};

const toggle = (): void => {
  _displaying ? hide() : display();
};

const minimize = (state: boolean): void => {
  UI.focus(true, true, state);
};

const getPermissions = (): string[] => {
  return Permission.get();
};

const start = (): void => {
  _displaying = false;

  UI.register('menu:close', hide);
  UI.register('menu:minimize', minimize);
  UI.register('menu:getPermissions', getPermissions);

  UI.register('menu:playerPedId', getPlayerPedId);

  RegisterCommand('menu', toggle, false);

  Log.debug('[MENU] started component');
};

const shutdown = (): void => {
  Log.debug('[MENU] destroyed component');
};

export const Menu = {
  start,
  shutdown,
};
