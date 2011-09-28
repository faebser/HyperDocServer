# Create your views here.
# -*- coding: latin-1 -*-
from django.template import Context, loader
from django.http import HttpResponse
from blub.models import Tag, Mess
from django.shortcuts import redirect
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import datetime
import re
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
import simplejson as json

def index(request):
    latest_mess_list = 'abc'
    t = loader.get_template('index.html')
    c = Context({
        'latest_mess_list': latest_mess_list,
    })
    c.update(csrf(request))
    return HttpResponse(t.render(c))

def solveproduce(request):
    latest_mess_list = 'abc'
    t = loader.get_template('solveproduce.html')
    c = Context({
        'latest_mess_list': latest_mess_list,
    })
    c.update(csrf(request))
    return HttpResponse(t.render(c))

def returnJson(request):
    #tags = Tag.objects.all()
    #data = [[2,4],[4,2]]
    #for d in data:
        #print d
    
    #for tag in tags:
        #newTag = Mess.objects.filter(tags__title__contains = tag)
        #print(newTag)
        #data.append(newTag)
        
    response = serializers.serialize('json', Mess.objects.all(),use_natural_keys=True,ensure_ascii=False )
    return HttpResponse(response)

def returnTags(request):
    data = serializers.serialize('json', Tag.objects.all(),use_natural_keys=True )
    return HttpResponse(data)

def logMeIn(request):
    if request.method == 'POST':
        print('bla')
        if(request.POST['username'] != None and request.POST['password'] != None):
            print('authentiacte')
            user = authenticate(username = request.POST['username'], password = request.POST['password'])
            if user is not None:
                if user.is_active:
                    data = json.dumps({'login' : 'true'})
                    login(request,user)
                    return HttpResponse(data)
                else:
                    data = json.dumps({"login" : "inactive"})
                    return HttpResponse(data)
            else:
                data = json.dumps({"login" : "false"})
                return HttpResponse(data)
    else:
        return redirect('/')

def isLoggedIn(request):
    if not request.user.is_authenticated():
        return False
    else:
        return True

@csrf_exempt
def addMess(request):
    if isLoggedIn(request):
        if request.method == 'POST':
            stringWithAll = request.POST.__getitem__('mess')
            tags = re.findall('(?<=#)\w+', stringWithAll)
            
            newMess = Mess(text = stringWithAll, date = datetime.datetime.now())
            newMess.save()
            
            for tag in tags:
                try:
                    newTag = Tag.objects.get(title = tag)
                except Tag.DoesNotExist:
                    newTag = Tag(title = tag)
                    newTag.save()
                
                newMess.tags.add(newTag)
                          
            newMess.save()
            data = serializers.serialize('json', Mess.objects.filter(id=newMess.id),use_natural_keys=True )
            return HttpResponse(data)
        else:
            return redirect('/')
    else:
        return redirect('/')
