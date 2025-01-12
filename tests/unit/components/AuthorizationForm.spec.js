import { describe, it, beforeEach, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import AuthorizationForm from '@/components/ui/form/AuthorizationForm.vue';
import SiteInput from '@/components/ui/input/SiteInput.vue';

describe('AuthorizationForm.vue', () => {
    let store;
    let router;
    let actions;

    beforeEach(() => {
        actions = {
            login: vi.fn().mockResolvedValueOnce(true),
        };
        store = createStore({
            actions,
            getters: {
                isAuthenticated: () => true,
            },
        });
        router = createRouter({
            history: createWebHistory(),
            routes: [],
        });

        router.push = vi.fn();
    });

    it('Авторизация', async () => {
        const wrapper = mount(AuthorizationForm, {
            global: {
                plugins: [store, router],
                stubs: {
                    SiteInput,
                    SiteSpinner: true,
                },
            }
        });
        await wrapper.get('input[name="login"]').setValue('test');
        await wrapper.get('input[name="password"]').setValue('test');
        await wrapper.get('form').trigger('submit');
        expect(actions.login).toHaveBeenCalledTimes(1);
        expect(actions.login.mock.calls[0][1]).toEqual({
            username: 'test',
            password: 'test',
        });
        expect(store.getters.isAuthenticated).toBe(true);
    });
});
