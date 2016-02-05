(function() {
    'use strict';

    angular.module('proposicoes')
        .service('proposicaoService', ['$q', ProposicaoService]);

    function ProposicaoService($q) {
        var proposicoes = [{
            id: 1,
            tipo: 'PDL',
            descricao: 'Prêmio Papa João Paulo II',
            codigo: '016.00001.2015',
            ementa: 'Concede o Prêmio Papa João Paulo II ao PADRE ALCEU ZEMBRUSKI e OUTROS que se destacaram no ano de 2015.',
            resumo: 'Concede o Prêmio Papa João Paulo II ao PADRE ALCEU ZEMBRUSKI e OUTROS que se destacaram no ano de 2015.',
            iniciativa: 'Comissão de Educação, Cultura e Turismo',
            avatar_url: './assets/img/default_avatar.png'
        }, {
            id: 2,
            tipo: 'PLO',
            descricao: 'Declaração de Utilidade Pública',
            codigo: '014.00013.2015',
            ementa: 'Declara de Utilidade Pública a ACVD MaisMarias (Associação de Combate A Violência Doméstica MaisMarias).',
            resumo: 'Concede o Prêmio Papa João Paulo II ao PADRE ALCEU ZEMBRUSKI e OUTROS que se destacaram no ano de 2015.',
            iniciativa: 'Jonny Stica',
            avatar_url: './assets/img/default_avatar.png'
        }, {
            id: 3,
            tipo: 'PLO',
            descricao: 'Declaração de Utilidade Pública',
            codigo: '014.00013.2015',
            ementa: 'Declara de Utilidade Pública a ACVD MaisMarias (Associação de Combate A Violência Doméstica MaisMarias).',
            resumo: 'Concede o Prêmio Papa João Paulo II ao PADRE ALCEU ZEMBRUSKI e OUTROS que se destacaram no ano de 2015.',
            iniciativa: 'Jonny Stica',
            avatar_url: './assets/img/default_avatar.png'
        }, {
            id: 4,
            tipo: 'PLO',
            descricao: 'Declaração de Utilidade Pública',
            codigo: '014.00013.2015',
            ementa: 'Declara de Utilidade Pública a ACVD MaisMarias (Associação de Combate A Violência Doméstica MaisMarias).',
            resumo: 'Concede o Prêmio Papa João Paulo II ao PADRE ALCEU ZEMBRUSKI e OUTROS que se destacaram no ano de 2015.',
            iniciativa: 'Jonny Stica',
            avatar_url: './assets/img/default_avatar.png'
        }];

        // Promise-based API
        return {
            loadAllProposicoes: function() {
                return $q.when(proposicoes);
            }
        };
    }

})();
