# Connecting to mysql database
import mysql.connector
import numpy as np
import matplotlib.pyplot as plt
  
  
mydb = mysql.connector.connect(host="localhost", 
                               user="root", 
                               password="", 
                               database="aquaccess")
mycursor = mydb.cursor()
  
# Fecthing Data From mysql to my python progame
mycursor.execute("select enregistrement, prenom from personne")
result = mycursor.fetchall
  
Names = []
Marks = []
  
for i in mycursor:
    Names.append(i[0])
    Marks.append(i[1])
      
print("Name of Students = ", Names)
print("Marks of Students = ", Marks)
  
  
# Visulizing Data using Matplotlib
plt.bar(Names, Marks)
plt.ylim(0, 5)
plt.xlabel("Date")
plt.ylabel("Nombre d'enregistrement")
plt.title("Nombre d'enregistrement par jour")
plt.show()
