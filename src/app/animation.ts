import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const miAnimacion =
  trigger('routeAnimations', [
    transition('Home <=> Login',deslizar()),
    transition('* <=> Home', irHome()),
    transition('* => Turnos', cargarDesdeAbajo()),
    transition('* => Perfil', cargarDesdeAbajo()),
    transition('* => PanelControl', deslizar()),
    transition('Login <=> Registro', cargarDesdeAbajo()),
  ]);

  function cargarDesdeAbajo(){
    return [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ],{optional: true}),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ]),
    ]
  }

  function deslizar(){
    return [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ],{optional: true}),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild(),{optional: true}),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%' }))
          ],{optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]
  }

  function irHome(){
    return [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ],{optional: true}),
        query(':enter', [
          style({ right: '-100%' })
        ],{optional: true}),
        query(':leave', animateChild(),{optional: true}),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ right: '100%' }))
          ],{optional: true}),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%' }))
          ])
        ]),
        query(':enter', animateChild()),
      ]
  }