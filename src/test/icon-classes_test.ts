import {assert, fixture} from '@open-wc/testing';
import {html, render} from 'lit';
import {albyLogo} from '../components/icons/albyLogo.js';
import {backIcon} from '../components/icons/backIcon.js';
import {checkIcon} from '../components/icons/checkIcon.js';
import {disconnectIcon} from '../components/icons/disconnectIcon.js';
import {cashuMeIcon} from '../components/icons/connectors/cashuMeIcon.js';
import {lncIcon} from '../components/icons/connectors/lncIcon.js';
import {rizfulIcon} from '../components/icons/connectors/rizfulIcon.js';
import {custodialWalletIcons} from '../components/icons/new-wallet/custodialWalletIcons.js';

suite('icon classes', () => {
  const icons = {
    albyLogo,
    backIcon,
    checkIcon,
    disconnectIcon,
    cashuMeIcon,
    lncIcon,
    rizfulIcon,
    custodialWalletIcons,
  };

  for (const [name, icon] of Object.entries(icons)) {
    test(`${name} uses caller classes independently and updates them`, async () => {
      const el = await fixture<HTMLDivElement>(html`<div></div>`);
      render(html`${icon('w-4 h-4')}${icon('w-12 h-12')}`, el);
      const [first, second] = el.querySelectorAll('svg');
      assert.equal(first.getAttribute('class'), 'w-4 h-4');
      assert.equal(second.getAttribute('class'), 'w-12 h-12');
      assert.equal(first.namespaceURI, 'http://www.w3.org/2000/svg');

      render(html`${icon('text-red-500')}${icon()}`, el);
      const updated = el.querySelectorAll('svg');
      assert.equal(updated[0].getAttribute('class'), 'text-red-500');
      assert.equal(updated[1].getAttribute('class'), '');
    });
  }

  test('disconnect icon retains its arrow animation hook', async () => {
    const el = await fixture(html`<div>${disconnectIcon('w-6 h-6')}</div>`);
    assert.isNotNull(el.querySelector('svg path.hover-right'));
  });
});
