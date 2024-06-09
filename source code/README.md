English version see below

### Einleitung

Um unseren Kunden zu ermöglichen unsere Maschinen ohne Programmierkenntnisse zu "programmieren", möchten wir einen webbasierten Editor erstellen, in dem der Kunde einzelne Prozessschritte anlegen kann, auswählt welche Funktion jeweils ausgeführt werden soll und die Schritte zu einer Sequenz aneinanderreihen kann.
Welche Funktionen die Maschine beherrscht, ist in einer separaten json-Datei festgelegt: `MachineCapabilities`. Die einzelnen Funktionen sind gruppiert zu "Modulen" wie z.B. `GantryAxisX`, `VGU` oder `Cameras`. Eine Funktion wird identifiziert als `Modulname/Funktionsname` also z.B. `GantryAxisX/GetPosition`. Diese Datei zu erstellen oder zu bearbeiten ist nicht Teil dieser Aufgabe.
Je nachdem, ob ein Schritt erfolgreich war oder nicht, soll ein anderer Nachfolgeschritt gewählt werden können. Diese werden in der json-Datei unter `Transitions` festgelegt. Das `result` ist entweder `Failed` oder `Succeeded`
Die Sequenz endet damit, dass ein spezieller Prozessschritt `Done`aufgerufen wird. Er soll an seinem `StepType` `5` erkennbar sein.

### Zur Verfügung gestellt werden

- Beispielsequenz `sequence_assessment.json`
- Datei mit verfügbaren Funktionen der Maschine `MachineCapabilities_Assessment.json`
- Datei `interfaces.ts`, die beschreibt welche Datenstrukturen in den beiden zuvor genannten json-Dateien erwartet werden

### Workflow des Users

1. Erstelle eine neue leere Sequenz
   - Diese kann bereits einen `Done`-Schritt enthalten
2. Füge einen einen Prozessschritt hinzu
3. Wähle die auszuführende Funktion aus
4. Füge weitere Prozessschritt hinzu und wähle die zugehörige Funktion aus
5. Lege für jeden Prozessschritt fest was im Erfolgsfall und optional auch was im Fehlerfall als nächstes ausgeführt werden soll.

### Abzudeckende Use-Cases

Der Editor soll hierzu in der Lage sein:

- Laden der `MachineCapabilities`-Datei
- Laden einer vorhandenen Sequenz aus einer json-Datei wie `sequence_assessment.json`
- Erstellen einer neuen, leeren Sequenz
- Speichern (herunterladen) einer Sequenz als json-Datei
- Anzeigen aller Prozessschritte einer Sequenz
- Neuen Schritt hinzufügen
- Schritt löschen
- Auswählen welche Funktion in einem Schritt ausgeführt werden soll
- Nachfolger von einem Schritt bearbeiten
  - Nachfolgeschritt für `Failed` auswählen
  - Nachfolgeschritt für `Succeeded` auswählen

### Randbedingungen

- Programmiersprache(n) und Frameworks können frei gewählt werden

### Deliverables

- Lauffähige HTML-Datei(en), mit denen wir den Editor ohne weiteres Tooling im Browser öffnen können.
- Source Code
- Sofern vorhanden: weitere Unterlagen aus der Entwicklung wie Textdokumente, Diagramme oder Zeichnungen.

### Bewertung

- Es soll nicht nur um die Umsetzung gehen, sondern auch darum wie vorgegangen wurde oder worauf besonders geachtet wurde.
- Rückfragen des Bewerbers sind ebenfalls gern gesehen, da sie auch etwas über die Arbeitsweise aussagen.
- In einem eventuell folgenden Vorstellungsgespräch würden wir die Lösung auch als Diskussionsgrundlage verwenden.

# English Version

### Introduction

In order to enable our customers to “program” our machines without programming knowledge,
we would like to create a web-based editor in which the customer
can create individual process steps, select which function is to be executed
in each step and put the steps together to form a sequence.

Which functions the machine can perform is defined in a separate json file: `MachineCapabilities`.
The individual functions are grouped into “modules” such as `GantryAxisX`, `VGU` or `Cameras`.
A function is identified as 'Module name/Function name', e.g. 'GantryAxisX/GetPosition'.
Creating or editing this file is not part of this task.

Depending on whether a step was successful or not, it should be possible to select a different
subsequent step. These are defined in the json file under `Transitions`. The `result` is either `Failed` or `Succeeded`
The sequence ends with a special process step `Done` being called. It should be recognizable by its `StepType` `5`.

### The following are provided

- Example sequence `sequence_assessment.json`
- File with available functions of the machine `MachineCapabilities_Assessment.json`.
- File `interfaces.ts`, which describes which data structures are expected in the two json files mentioned above

### Workflow of the user

1. create a new empty sequence
   - this can already contain a 'Done' step
2. add a process step
3. select the function to be executed
4. add further process steps and select the associated function
5. specify for each process step what should be executed next in the event of success and optionally also what should be executed next in the event of an error.

### Use cases to be covered

The editor should be able to do this:

- Load the `MachineCapabilities` file
- Load an existing sequence from a json file like `sequence_assessment.json`
- Create a new, empty sequence
- Save (download) a sequence as a json file
- Display all process steps of a sequence
- Add a new step
- Delete step
- Select which function is to be executed in a step
- Edit the successor of a step
  - Select successor step for `Failed
  - Select successor step for `Succeeded

### Boundary conditions

- Programming language(s) and frameworks can be chosen freely

### Deliverables

- Executable HTML file(s) with which we can open the editor in the browser without further tooling.
- Source code
- If available: further documents from the development such as text documents, diagrams or drawings.

### Evaluation

- It should not only be about the implementation, but also about how it was done or what special attention was paid to.
- Questions from the applicant are also welcome, as they also say something about the working method.
- In a possible subsequent interview, we would also use the solution as a basis for discussion.
