from tkinter import *
from tkinter import ttk
import tkinter as tk  
import mysql.connector
from PIL import Image,ImageTk
from datetime import date, timedelta
import schedule
import time
from tkcalendar import *



mysqldb=mysql.connector.connect(host="localhost",user="root",password="",database="aquaccess")
mycursor=mysqldb.cursor()
mycursor.execute("SELECT * FROM personne")
records = mycursor.fetchall()
print(len(records))

today = date.today()
yesterday = date.today() - timedelta(days=1)
yesterday2 = date.today() - timedelta(days=2)

def Ok():
    global myresult
    global j
    nom = "%"+e1.get()+"%"
    prenom = "%"+e2.get()+"%"
    enregistrement = "%"+e3.get()+"%"
 
    try:
        mycursor.execute("SELECT * FROM personne where nom LIKE %s AND prenom LIKE %s AND ID LIKE %s",(nom,prenom,enregistrement,))
        myresult = mycursor.fetchall()
        ##### prepare la liste
        for item in tv.get_children():
            tv.delete(item)
        for j in range(0, len(myresult)):
            IdNb = myresult[j][0]
            nm = myresult[j][1]
            ap = myresult[j][2]
            if  myresult[j][3] == 1:
                sx = "M"
            else:
                sx = "F"
            ag = myresult[j][4]
            dt = myresult[j][5]
            DateEnr = "%02d/%02d/%02d" % (dt.day, dt.month, dt.year)
            TimeEnr = "%02d:%02d" % (dt.hour, dt.minute)
    ## insere la liste dans le tableau
            tv.insert("", j, text=IdNb, values=(nm, ap, sx, ag, DateEnr, TimeEnr)),
 
##        e2.delete(0, END)
##        e2.insert(END, x[2])
##        e3.delete(0, END)
##        e3.insert(END, x[3])
 
    except Exception as e:
        mysqldb.rollback()
        mysqldb.close()

def AllValues():
    #### Charge la table
    mycursor.execute("SELECT * FROM personne")
    myresult = mycursor.fetchall()
    for item in tv.get_children():
        print(len(item))
        tv.delete(item)

    ###### prepare la liste
    for i in range(1, len(myresult)):
        IdNb = myresult[i][0]
        nm = myresult[i][1]
        ap = myresult[i][2]
        if  myresult[i][3] == 1:
            sx = "M"
        else:
            sx = "F"
        ag = myresult[i][4]
        dt = myresult[i][5]
        DateEnr = "%02d/%02d/%02d" % (dt.day, dt.month, dt.year)
        TimeEnr = "%02d:%02d" % (dt.hour, dt.minute)
        ## insere la liste dans le tableau
        tv.insert("", i, text=IdNb, values=(nm, ap, sx, ag, DateEnr, TimeEnr)),
        
#### CHERCHE NB d'enregistrements pour aujourd'hui
def RefreshDayValue():
    d1 = today.strftime("%Y-%m-%d")
    d1 = "%"+d1+"%"
    mycursor.execute("SELECT * FROM personne where enregistrement LIKE %s",(d1,))
    myresult = mycursor.fetchall()
    print(len(myresult))
    TextNBJ0 = "Aujourd'hui " + str(len(myresult)) + " enregistrements  (" + today.strftime("%d-%m-%Y") + ")"
    varNb0.set(TextNBJ0)

def DeleteInput():
    print("delinput")

def ClrNom():
    e1.delete(0, END)
#    e1.insert(END, x[1])
    
def ClrPrenom():
    e2.delete(0, END)
#    e2.insert(END, x[2])

def ClrID():
    e3.delete(0, END)
#    e3.insert(END, x[3])

def ClrDate():
    e4.delete(0, END)
#    e3.insert(END, x[3])
    
    
root = Tk()
root.title("Recherche d'enregistrement")
root.geometry("1000x800")

varNb0 = StringVar()
varNb0.set("")
varNb1 = StringVar()
varNb1.set("")
varNb2 = StringVar()
varNb2.set("")

###BOX Name
Label(root, text="Search by Name").place(x=10, y=10)
e1 = Entry(root)
e1.place(x=140, y=10)
Button(root, text="C", command=ClrNom ,height = 1, width = 2 ).place(x=270, y=10)

###BOX Surame
Label(root, text="Search by Surname").place(x=10, y=40)
e2 = Entry(root)
e2.place(x=140, y=40)
Button(root, text="C", command=ClrPrenom ,height = 1, width = 2 ).place(x=270, y=40)

###BOX ID
Label(root, text="Search by ID").place(x=10, y=70)
e3 = Entry(root)
e3.place(x=140, y=70)
Button(root, text="C", command=ClrID ,height = 1, width = 2 ).place(x=270, y=70)

###BOX Date
Label(root, text="Search by Date").place(x=10, y=100)
e4 = Entry(root)
e4.place(x=140, y=100)
e4.insert(0, today.strftime("%Y-%m-%d"))
Button(root, text="C", command=ClrDate ,height = 1, width = 2 ).place(x=270, y=100)


###Search Button 
Button(root, text="Search", command=Ok ,height = 7, width = 15 ).place(x=320, y=10)
##See All Button
Button(root, text="See All", command=AllValues ,height = 7, width = 15).place(x=480, y=10)

NBJ2_Label = tk.Label(root, text="NB Personnes J-2",font=('Helvatical bold',20), textvariable=varNb2)
NBJ2_Label.place(x=10,y=600)
NBJ1_Label = tk.Label(root, text="NB Personnes J-1",font=('Helvatical bold',20), textvariable=varNb1)
NBJ1_Label.place(x=10,y=640)
NBJ0_Label = tk.Label(root, text="NB Personnes J",font=('Helvatical bold',20), textvariable=varNb0)
NBJ0_Label.place(x=10,y=680)
Button(root, text="Refresh", command=RefreshDayValue ,height = 1, width = 13).place(x=600, y=680)
Button(root, text="Delete Selected Input", command=DeleteInput ,height = 1, width = 90).place(x=0, y=430)

##Cal = Calendar(root, selectmode="day", year=2021, month=8, day=16)
##Cal.pack (pady=20)

#### CHERCHE NB d'enregistrements pour hier
d2 = yesterday.strftime("%Y-%m-%d")
d2 = "%"+d2+"%"
mycursor.execute("SELECT * FROM personne where enregistrement LIKE %s",(d2,))
myresult = mycursor.fetchall()
TextNBJ1 = "Hier " + str(len(myresult)) + " enregistrements  (" + yesterday.strftime("%d-%m-%Y") + ")"
varNb1.set(TextNBJ1)

#### CHERCHE NB d'enregistrements pour aujourd'hui
d3 = yesterday2.strftime("%Y-%m-%d")
d3 = "%"+d3+"%"
mycursor.execute("SELECT * FROM personne where enregistrement LIKE %s",(d3,))
myresult = mycursor.fetchall()
TextNBJ2 = "Avant hier " + str(len(myresult)) + " enregistrements  (" + yesterday2.strftime("%d-%m-%Y") + ")"
varNb2.set(TextNBJ2)


##canvas = Canvas(root, width = 300, height = 300)  
##im=Image.open("004.jpeg")
##im = im.resize(400,300)
##photo=ImageTk.PhotoImage(im)
##cv = tk.Canvas()  
##cv.pack(side='top', fill='both', expand='yes')  
##cv.create_image(10, 10, image=photo, anchor='nw')  



tv = ttk.Treeview(root,selectmode='browse')

vsb = ttk.Scrollbar(root, orient="vertical", command=tv.yview)
vsb.place(x=625, y=200, height=200+25)

tv.configure(yscrollcommand=vsb.set)

tv['columns']=('Nombre', 'Apedillo', 'Sex', "Age", "Date", "Heure")
tv.column('#0', anchor=CENTER, width=60)
tv.column('Nombre', anchor=CENTER, width=160)
tv.column('Apedillo', anchor=CENTER, width=160)
tv.column('Sex', anchor=CENTER, width=40)
tv.column('Age', anchor=CENTER, width=40)
tv.column('Date', anchor=CENTER, width=80)
tv.column('Heure', anchor=CENTER, width=80)

tv.heading('#0', text='ID', anchor=CENTER)
tv.heading('Nombre', text='Nombre', anchor=CENTER)
tv.heading('Apedillo', text='Apedillo', anchor=CENTER)
tv.heading('Sex', text='Sex', anchor=CENTER)
tv.heading('Age', text='Age', anchor=CENTER)
tv.heading('Date', text='Fecha', anchor=CENTER)
tv.heading('Heure', text='Hora', anchor=CENTER)

tv.place(x=0,y=200)

AllValues()
RefreshDayValue()
  
root.mainloop()
