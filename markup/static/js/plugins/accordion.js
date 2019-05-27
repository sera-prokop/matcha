/*! akkordeon.js v1.0.0 | (c) Sascha Geyer */
(function(factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(($) => {
    'use strict';

    class Akkordeon {
        constructor($element, options) {
            Akkordeon.count = ++Akkordeon.count || 1;
            this.defaults = {
                controls: 'even',
                panels: 'odd',
                activeClass: 'akkordeon-active',
                activeElements: 'controls',
                controlsId: 'akkordeon-tab',
                panelsId: 'akkordeon-tabpanel',
                accessibility: true,
                duration: 400,
                easing: 'swing',
                closeOthers: true,
                opened: false,
                forceOpen: false,
                mediaQuery: undefined
            };
            this.opts = this.getOptions(options);
            this.originalOptions = this.opts;
            this.$accordion = $element;
            this.$controls = this.getControls();
            this.$panels = this.getPanels();
            this.$activeElements = this.getActiveElements();
            this.controlObjects = [];
            this.destroy = false;
            this.init();
        }


        getOptions(options) {
            return typeof options === 'object'
                ? $.extend({}, this.defaults, options)
                : this.defaults;
        }

        getControls() {
            return this.opts.controls === 'even'
                ? this.$accordion.children().filter(':even')
                : this.$accordion.find(this.opts.controls);
        }

        getPanels() {
            return this.opts.panels === 'odd'
                ? this.$accordion.children().filter(':odd')
                : this.$accordion.find(this.opts.panels);
        }

        getActiveElements() {
            switch (this.opts.activeElements) {
                case 'controls':
                    return this.$controls;
                case 'panels':
                    return this.$panels;
                default:
                    return this.$accordion.find(this.opts.activeElements);
            }
        }

        accessibility() {
            if (this.opts.accessibility && !this.destroy) {
                this.$accordion.attr({
                    'role': 'tablist',
                    'aria-multiselectable': ((!this.opts.closeOthers).toString())
                });
            } else {
                this.$accordion.removeAttr('role aria-multiselectable');
            }
        }

        buildAkkordeon() {
            this.accessibility();
            this.controlObjects = [];
            this.$controls.each((index, controlElement) => {
                this.controlObjects.push(new Control($(controlElement), this));
            });
            $.each(this.controlObjects, (index, controlObject) => {
                this.destroy ? controlObject.destroy() : controlObject.init();
            });
        }

        reInit(mql) {
            if (mql.matches && mql.opts === 'destroy') {
                this.destroy = true;
                this.$accordion.trigger('destroy', this);
            } else if (mql.matches) {
                this.opts = mql.opts;
            } else {
                this.opts = this.originalOptions;
            }
            this.buildAkkordeon();
            this.destroy = false;
        }

        getMediaQueryList() {
            const mediaQueryString = Object.keys(this.opts.mediaQuery)[0];
            const mql = window.matchMedia(mediaQueryString);
            const rawOpts = this.opts.mediaQuery[mediaQueryString];
            mql.opts = (rawOpts === 'destroy')
                ? rawOpts
                : $.extend({}, this.opts, rawOpts);
            return mql;
        }

        init() {
            if (this.opts.mediaQuery !== undefined) {
                const mql = this.getMediaQueryList();
                this.reInit(mql);
                mql.addListener(this.reInit.bind(this, mql));
            } else {
                this.buildAkkordeon();
            }
        }
    }

    class Control {
        constructor($controlElement, akkordeonClass) {
            this.controlObjects = akkordeonClass.controlObjects;
            this.opts = akkordeonClass.opts;
            this.$controls = akkordeonClass.$controls;
            this.$panels = akkordeonClass.$panels;
            this.$activeElements = akkordeonClass.$activeElements;
            this.$control = $controlElement;
            this.index = this.$controls.index(this.$control);
            this.$panel = this.$panels.eq(this.index);
            this.state = this.getState();
            this.$firstControl = this.$controls.first();
            this.$lastControl = this.$controls.last();
            this.$prevControl = this.getPrevControl();
            this.$nextControl = this.getNextControl();
            this.$initialTab = this.getInitialTab();
            this.$activeElement = this.$activeElements.eq(this.index);
        }

        getState() {
            let state = (this.opts.opened === true ? 'opened' : 'closed');
            if (this.opts.opened === this.index) {
                state = 'opened';
            }
            return state;
        }

        getPrevControl() {
            return this.$controls.eq(this.index - 1);
        }

        getNextControl() {
            return this.$control.is(this.$lastControl)
                ? this.$firstControl
                : this.$controls.eq(this.index + 1);
        }

        getInitialTab() {
            return typeof this.opts.opened === 'number'
                ? this.$controls.eq(this.opts.opened)
                : this.$firstControl;
        }

        destroy() {
            this.$activeElement.removeClass(this.opts.activeClass);
            this.$panel.css('display', '');
            this.removeAccessibility();
            this.removeEvents();
        }

        init() {
            if (this.state === 'closed') {
                this.$panel.hide();
                this.$activeElement.removeClass(this.opts.activeClass);
            } else if (this.state === 'opened') {
                this.$panel.show();
                this.$activeElement.addClass(this.opts.activeClass);
            }
            this.opts.accessibility ? this.addAccessibility() : this.removeAccessibility();
            this.removeEvents();
            this.addEvents();
        }

        addAccessibility() {
            const suffix = `-${Akkordeon.count}-${this.index + 1}`;
            const controlId = `${this.opts.controlsId}${suffix}`;
            const panelId = `${this.opts.panelsId}${suffix}`;

            this.$control[0].id = this.$control[0].id || controlId;
            this.$panel[0].id = this.$panel[0].id || panelId;

            this.$control.attr({
                'role': 'tab',
                'aria-controls': this.$panel[0].id,
                'tabindex': (this.$control.is(this.$initialTab) ? 0 : -1),
                'aria-selected': (this.$control.is(this.$initialTab)),
                'aria-expanded': (this.state === 'opened')
            });

            this.$panel.attr({
                'role': 'tabpanel',
                'aria-labelledby': this.$control[0].id,
                'aria-hidden': (this.state === 'closed')
            });
        }

        removeAccessibility() {
            this.$control.removeAttr('role aria-expanded aria-controls tabindex aria-selected');
            this.$panel.removeAttr('role aria-hidden aria-labelledby');

            if (this.$control[0].id.indexOf(this.opts.controlsId) === 0) {
                this.$control.removeAttr('id');
            }

            if (this.$panel[0].id.indexOf(this.opts.panelsId) === 0) {
                this.$panel.removeAttr('id');
            }
        }

        toggle(slideMethod, toggleClassMethod, startState, endState, hidden) {
            this.$panel[slideMethod]({
                duration: this.opts.duration,
                easing: this.opts.easing,
                start: () => {
                    this.$control.trigger(startState, [this, this.$control, this.$index]);
                    this.state = startState;
                    this.$activeElement[toggleClassMethod](this.opts.activeClass);
                },
                done: () => {
                    this.$control.trigger(endState, [this, this.$control, this.$index]);
                    this.state = endState;
                    if (this.opts.accessibility) {
                        this.$control.attr('aria-expanded', !hidden);
                        this.$panel.attr('aria-hidden', hidden);
                    }
                }
            });
        }

        close() {
            this.toggle('slideUp', 'removeClass', 'closing', 'closed', true);
        }

        open() {
            this.toggle('slideDown', 'addClass', 'opening', 'opened', false);
        }

        closeOthers() {
            $.each(this.controlObjects, (index, ControlObject) => {
                if (ControlObject.state !== 'closed' && index !== this.index) {
                    ControlObject.close();
                }
            });
        }

        forceOpen() {
            $.each(this.controlObjects, (index, ControlObject) => {
                if (ControlObject.state === 'opened' && index !== this.index) {
                    this.close();
                }
            });
        }

        toggleTabIndex() {
            this.$controls.attr({
                'tabindex': -1,
                'aria-selected': false
            });

            this.$control.attr({
                'tabindex': 0,
                'aria-selected': true
            });
        }

        togglePanel() {
            switch (this.state) {
                case 'opening':
                case 'opened':
                    this.opts.forceOpen ? this.forceOpen() : this.close();
                    break;
                case 'closing':
                case 'closed':
                    if (this.opts.closeOthers) this.closeOthers();
                    this.open();
                    break;
            }
        }

        keyNavigation(event) {
            switch (event.keyCode) {
                case 13: // enter
                case 32: // space
                    event.preventDefault();
                    this.togglePanel.call(this);
                    break;
                case 35: // end
                    event.preventDefault();
                    this.$lastControl.focus();
                    break;
                case 36: // home
                    event.preventDefault();
                    this.$firstControl.focus();
                    break;
                case 37: // left
                case 38: // up
                    event.preventDefault();
                    this.$prevControl.focus();
                    break;
                case 39: // right
                case 40: // down
                    event.preventDefault();
                    this.$nextControl.focus();
                    break;
            }
        }

        addEvents() {
            this.$control.on('click.akkordeon', this.togglePanel.bind(this));
            this.$control.on('keydown.akkordeon', this.keyNavigation.bind(this));
            this.$control.on('focus.akkordeon', this.toggleTabIndex.bind(this));
        }

        removeEvents() {
            this.$control.off('click.akkordeon');
            this.$control.off('keydown.akkordeon');
            this.$control.off('focus.akkordeon');
        }
    }

    $.fn.akkordeon = function(opts) {
        return this.each(function() {
            this.akkordeon = new Akkordeon($(this), opts);
        });
    };
}));
