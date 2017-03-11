from rest_framework.routers import DefaultRouter, Route, SimpleRouter, DynamicDetailRoute, DynamicListRoute


class ParkingRouter(SimpleRouter):
    routes = [
        Route(
            url=r'^{prefix}{trailing_slash}$',
            mapping={'get': 'list',
                     'post': 'create'},
            name='{basename}-list',
            initkwargs={'suffix': 'List'}
        ),
        Route(
            url=r'^{prefix}/(?P<lon>.+)/(?P<lat>.+){trailing_slash}$',
            mapping={'get': 'retrieve',
                     'put': 'update',
                     'patch': 'partial_update',
                     'delete': 'destroy'
                     },
            name='{basename}-detail',
            initkwargs={'suffix': 'Detail'}
        ),
    ]
