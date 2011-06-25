from django.conf import settings
from django.conf.urls.defaults import *
from django.contrib import admin
admin.autodiscover()

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    (r'^templates/(?P<path>.*)$','django.views.static.serve', {'document_root': settings.MEDIA_ROOT }),
    #(r'^templates/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'theMess/templates/'}),
    (r'^$','blub.views.index'),
    (r'^mess/$','blub.views.addMess'),
    (r'^json/$','blub.views.returnJson'),
    (r'^tags/$','blub.views.returnTags'),
    (r'^solveproduce/$','blub.views.solveproduce'),
    # Example:
    # (r'^HyperMess/', include('HyperMess.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls))
)
