'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' : 'data-bs-target="#xs-controllers-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' :
                                            'id="xs-controllers-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' : 'data-bs-target="#xs-injectables-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' :
                                        'id="xs-injectables-links-module-AppModule-75c36510fbc30fa43a6eb52b5e9631f1df777ebc40384111d24ee7f501fd0e7a92e3d13034608c8d39d2d9c89eaa226659ebcfd4e5f29ff3a967dac3118f50bb"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AtividadeModule.html" data-type="entity-link" >AtividadeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' : 'data-bs-target="#xs-controllers-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' :
                                            'id="xs-controllers-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' }>
                                            <li class="link">
                                                <a href="controllers/AtividadeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AtividadeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' : 'data-bs-target="#xs-injectables-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' :
                                        'id="xs-injectables-links-module-AtividadeModule-50bcf773935f813276b0fd15560208508fcafc62372887bb0ebdff97432832bae08228131396635695872879ca6ee08f84278c603e46f88b3655e1219d584d5b"' }>
                                        <li class="link">
                                            <a href="injectables/AtividadeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AtividadeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' :
                                            'id="xs-controllers-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' :
                                        'id="xs-injectables-links-module-AuthModule-dba74c6e2d22b69e50618c519bc7ed4e0b0e18fd53ccfd6c624be2e45e30a6150e5172e8e70bead16ae071d77212792489629e89776a3b1cb8982c025b2b0a2c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CertificadoModule.html" data-type="entity-link" >CertificadoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' : 'data-bs-target="#xs-controllers-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' :
                                            'id="xs-controllers-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' }>
                                            <li class="link">
                                                <a href="controllers/CertificadoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CertificadoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' : 'data-bs-target="#xs-injectables-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' :
                                        'id="xs-injectables-links-module-CertificadoModule-5b6c74d98e21971475b4862c77a71e386cf831e530770938f977794277fb152937b1f1c9f2d419530df437c6763eb14ac4104f470b022873c2358161e3e291a2"' }>
                                        <li class="link">
                                            <a href="injectables/CertificadoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CertificadoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataAtividadeModule.html" data-type="entity-link" >DataAtividadeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' : 'data-bs-target="#xs-controllers-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' :
                                            'id="xs-controllers-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' }>
                                            <li class="link">
                                                <a href="controllers/DataAtividadeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataAtividadeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' : 'data-bs-target="#xs-injectables-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' :
                                        'id="xs-injectables-links-module-DataAtividadeModule-98b5427b10cd71cc8b8261557975661610585164908328979d2d2977fe24408a5901ea3f09766b29687e45afad5f249b026e8a7a78c0e761619a32890250cad8"' }>
                                        <li class="link">
                                            <a href="injectables/DataAtividadeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataAtividadeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataAtividadeParticipanteModule.html" data-type="entity-link" >DataAtividadeParticipanteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' : 'data-bs-target="#xs-controllers-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' :
                                            'id="xs-controllers-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' }>
                                            <li class="link">
                                                <a href="controllers/DataAtividadeParticipanteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataAtividadeParticipanteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' : 'data-bs-target="#xs-injectables-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' :
                                        'id="xs-injectables-links-module-DataAtividadeParticipanteModule-11ba86689b8a081ec5e37ff54b58afad6ffbc3a6a6965a7ecb34e504830c8f81ec8672183b5a488ea5e21c85bebe32feb7639c76aaaa2b015eea3c408dc85f02"' }>
                                        <li class="link">
                                            <a href="injectables/DataAtividadeParticipanteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataAtividadeParticipanteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventoModule.html" data-type="entity-link" >EventoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' : 'data-bs-target="#xs-controllers-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' :
                                            'id="xs-controllers-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' }>
                                            <li class="link">
                                                <a href="controllers/EventoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' : 'data-bs-target="#xs-injectables-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' :
                                        'id="xs-injectables-links-module-EventoModule-7bc490b12e0e9bb64e9129cc7aae0dcc4789af5cfb8101ce49aaea968dc653eb43bd764f6aa79377942e88f18e4dd19eb080e6b495994fa328a80623ca5bb48d"' }>
                                        <li class="link">
                                            <a href="injectables/EventoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventoParticipanteModule.html" data-type="entity-link" >EventoParticipanteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' : 'data-bs-target="#xs-controllers-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' :
                                            'id="xs-controllers-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' }>
                                            <li class="link">
                                                <a href="controllers/EventoParticipanteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventoParticipanteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' : 'data-bs-target="#xs-injectables-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' :
                                        'id="xs-injectables-links-module-EventoParticipanteModule-ce5be6e2d244de2faa1052e119aaaf678e9f14c97af464f7c8225dc5bd0a2bd391774e64ca7e55cbd8c05d9c533cf5a15d70f3722281fb456d8419dc33b4b23d"' }>
                                        <li class="link">
                                            <a href="injectables/EventoParticipanteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventoParticipanteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PalestranteAtividadeModule.html" data-type="entity-link" >PalestranteAtividadeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' : 'data-bs-target="#xs-controllers-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' :
                                            'id="xs-controllers-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' }>
                                            <li class="link">
                                                <a href="controllers/PalestranteAtividadeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PalestranteAtividadeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' : 'data-bs-target="#xs-injectables-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' :
                                        'id="xs-injectables-links-module-PalestranteAtividadeModule-d5b9f699d89d37c9704877128442668798864962ac000fcf4931cbf83457b12b53006e8d0018f69cb41f794dfc6a38ff3ff35feb9aa5cacb2e0104c827a4a048"' }>
                                        <li class="link">
                                            <a href="injectables/PalestranteAtividadeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PalestranteAtividadeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PalestranteModule.html" data-type="entity-link" >PalestranteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' : 'data-bs-target="#xs-controllers-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' :
                                            'id="xs-controllers-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' }>
                                            <li class="link">
                                                <a href="controllers/PalestranteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PalestranteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' : 'data-bs-target="#xs-injectables-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' :
                                        'id="xs-injectables-links-module-PalestranteModule-d6e9047cc795cd872c83d26d0d07f3f94779c233b8fe09a78bc8314d6de58d1061476c72010e3eb85df6e4a6982c7dbe11a6e32211c255c8cd63ab50dbbb851a"' }>
                                        <li class="link">
                                            <a href="injectables/PalestranteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PalestranteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ParticipanteModule.html" data-type="entity-link" >ParticipanteModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' : 'data-bs-target="#xs-controllers-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' :
                                            'id="xs-controllers-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' }>
                                            <li class="link">
                                                <a href="controllers/ParticipanteController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipanteController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' : 'data-bs-target="#xs-injectables-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' :
                                        'id="xs-injectables-links-module-ParticipanteModule-8d8f30b8c6b3f7bc7aecc4f832df1eb9204f69432711945efdb9312e2405e5fe4a1c1f5eda2cbb1758e22a3ec1f92ddbd34402c84c4d3c860f288bc1b5b9edad"' }>
                                        <li class="link">
                                            <a href="injectables/ParticipanteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParticipanteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-9bf55407b8ae49b48d70fa52dd09ef0738f55c66cdf63b48af1ba3d5a6b03bab16a2567949e66ac2250c18640e70c1b125f1c81bd232096340d6c30d896d5572"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-9bf55407b8ae49b48d70fa52dd09ef0738f55c66cdf63b48af1ba3d5a6b03bab16a2567949e66ac2250c18640e70c1b125f1c81bd232096340d6c30d896d5572"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-9bf55407b8ae49b48d70fa52dd09ef0738f55c66cdf63b48af1ba3d5a6b03bab16a2567949e66ac2250c18640e70c1b125f1c81bd232096340d6c30d896d5572"' :
                                        'id="xs-injectables-links-module-PrismaModule-9bf55407b8ae49b48d70fa52dd09ef0738f55c66cdf63b48af1ba3d5a6b03bab16a2567949e66ac2250c18640e70c1b125f1c81bd232096340d6c30d896d5572"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SalaModule.html" data-type="entity-link" >SalaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' : 'data-bs-target="#xs-controllers-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' :
                                            'id="xs-controllers-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' }>
                                            <li class="link">
                                                <a href="controllers/SalaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SalaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' : 'data-bs-target="#xs-injectables-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' :
                                        'id="xs-injectables-links-module-SalaModule-8cc9f58e24d35d3baed95d5753115300dfc8798428059924e28cf634160b75835960797e0170899be20e0ae32be5c463efd3b6aec65b4d27c0afe8bac9ad93db"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SalaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SalaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TurmaModule.html" data-type="entity-link" >TurmaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' : 'data-bs-target="#xs-controllers-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' :
                                            'id="xs-controllers-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' }>
                                            <li class="link">
                                                <a href="controllers/TurmaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TurmaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' : 'data-bs-target="#xs-injectables-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' :
                                        'id="xs-injectables-links-module-TurmaModule-531b252dc3db3c8bb63f58eb2a2d66f55a050d0c36baebf929355cde3e44b233db39169d7320654291b3b3e2493ca03f20555afe809cb1c70cb137d29ff4bafd"' }>
                                        <li class="link">
                                            <a href="injectables/TurmaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TurmaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TurnoModule.html" data-type="entity-link" >TurnoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' : 'data-bs-target="#xs-controllers-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' :
                                            'id="xs-controllers-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' }>
                                            <li class="link">
                                                <a href="controllers/TurnoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TurnoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' : 'data-bs-target="#xs-injectables-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' :
                                        'id="xs-injectables-links-module-TurnoModule-ff00ddf2dca69cd53dedf8936f1c10a3f940f1e3cf7d1d512e288fd3d4b2cebfe652b024c96c4861aedd3500f0be1032a666f753f53df20a1cfa2dcf173123ed"' }>
                                        <li class="link">
                                            <a href="injectables/TurnoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TurnoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuarioModule.html" data-type="entity-link" >UsuarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' : 'data-bs-target="#xs-controllers-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' :
                                            'id="xs-controllers-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' }>
                                            <li class="link">
                                                <a href="controllers/UsuarioController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuarioController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' : 'data-bs-target="#xs-injectables-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' :
                                        'id="xs-injectables-links-module-UsuarioModule-633986b4b64df032ebe5de6a14ac07813bcadd9dd1a6851485c73c7c2c4a4938e6ba5d40376f6ba647477960afc689ba8069f6f1bda15f2407162b315aa093df"' }>
                                        <li class="link">
                                            <a href="injectables/UsuarioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuarioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AtividadeController.html" data-type="entity-link" >AtividadeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CertificadoController.html" data-type="entity-link" >CertificadoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DataAtividadeController.html" data-type="entity-link" >DataAtividadeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DataAtividadeParticipanteController.html" data-type="entity-link" >DataAtividadeParticipanteController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EventoController.html" data-type="entity-link" >EventoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EventoParticipanteController.html" data-type="entity-link" >EventoParticipanteController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PalestranteAtividadeController.html" data-type="entity-link" >PalestranteAtividadeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PalestranteController.html" data-type="entity-link" >PalestranteController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ParticipanteController.html" data-type="entity-link" >ParticipanteController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProfileController.html" data-type="entity-link" >ProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SalaController.html" data-type="entity-link" >SalaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TurmaController.html" data-type="entity-link" >TurmaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TurnoController.html" data-type="entity-link" >TurnoController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsuarioController.html" data-type="entity-link" >UsuarioController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AtividadeDTO.html" data-type="entity-link" >AtividadeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CertificadoDTO.html" data-type="entity-link" >CertificadoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataAtividadeDTO.html" data-type="entity-link" >DataAtividadeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataAtividadeParticipanteDTO.html" data-type="entity-link" >DataAtividadeParticipanteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventoDTO.html" data-type="entity-link" >EventoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventoParticipanteDTO.html" data-type="entity-link" >EventoParticipanteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PalestranteAtividadeDTO.html" data-type="entity-link" >PalestranteAtividadeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PalestranteDTO.html" data-type="entity-link" >PalestranteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParticipanteDTO.html" data-type="entity-link" >ParticipanteDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/TurmaDTO.html" data-type="entity-link" >TurmaDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/TurnoDTO.html" data-type="entity-link" >TurnoDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsuarioDTO.html" data-type="entity-link" >UsuarioDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminAuxMiddleware.html" data-type="entity-link" >AdminAuxMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminMiddleware.html" data-type="entity-link" >AdminMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AtividadeService.html" data-type="entity-link" >AtividadeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CertificadoService.html" data-type="entity-link" >CertificadoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataAtividadeParticipanteService.html" data-type="entity-link" >DataAtividadeParticipanteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataAtividadeService.html" data-type="entity-link" >DataAtividadeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventoParticipanteService.html" data-type="entity-link" >EventoParticipanteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventoService.html" data-type="entity-link" >EventoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PalestranteAtividadeService.html" data-type="entity-link" >PalestranteAtividadeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PalestranteService.html" data-type="entity-link" >PalestranteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParticipanteService.html" data-type="entity-link" >ParticipanteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileController.html" data-type="entity-link" >ProfileController</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SalaService.html" data-type="entity-link" >SalaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TurmaService.html" data-type="entity-link" >TurmaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TurnoService.html" data-type="entity-link" >TurnoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioService.html" data-type="entity-link" >UsuarioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});