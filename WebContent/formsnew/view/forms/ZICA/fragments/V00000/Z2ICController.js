<core:FragmentDefinition  xmlns:t="sap.ui.table" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:f="sap.ui.layout.form" xmlns:core="sap.ui.core"   	xmlns:u="sap.ui.unified">

 <!-- 
<Toolbar>
   <ToolbarSpacer/>
   <ToolbarSpacer/>
   <Button text="{i18n>EXCEL.UPLOAD}" press="handleUploadPress" enabled="true" icon="sap-icon://upload" tooltip="{i18n>EXCEL.UPLOAD}"/>
   <Button text="{i18n>EXPORT.PDF}" press="handlePdfPress" enabled="true" icon="sap-icon://pdf-attachment" tooltip="{i18n>EXPORT.PDF}"/>
  </Toolbar>
   -->
  	<ScrollContainer height="100%" vertical="true" horizontal="true" class="sapUmcConsumptionSegmentedButton"> 		

		<Panel expandable="true" expanded="false" headerText="INSTRUCCIONES" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
		<VBox>  <!--  
		<Label text="{i18n>Z2IC.INSTRUC1}" />-->
		<Label text="{i18n>Z2IC.INSTRUC2}"></Label>
   		<Button
		text="{i18n>Z2IC.DESCARGARINSTRUCTIVO}" enabled="{EnabledModel>/Enabled}"
		press="onPressInstructivo" 
		class="sapUiSmallMarginBottom  sapUmcConsumptionSegmentedButton" />
		</VBox>
		</Panel>
		
		
 <Panel expandable="true" expanded="true" headerText="{i18n>Z2IC.VTITINFGENI}" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
  
   <l:Grid defaultSpan="L1 M4 S6" class="sapDireccion">	
   <VBox>
	<Label text="{i18n>Z2IC.VA_002_DEPART}" id="A_002_DEPART">
      	<layoutData  class="sapUiSmallMargins">
		<l:GridData span="L2 M12 S12"/>
	</layoutData>
   </Label>
 
   <Input id="_Z2IC_A_002_DEPART_input" value="{Z2ICModel>/A_002_DEPART}" enabled="false" change="onChange"/>
   					   	<layoutData>
				<l:GridData span="L6 M12 S12" />
			</layoutData>
   </VBox>
 
 <!--  
   	      	      <ComboBox
	            selectedKey = "{Z2ICModel>/A_002_DEPART}"
					width="100%" change="Region1Select" placeholder="Seleccione el departamento" tooltip="Seleccione el departamento"
					   enabled="{EnabledModel>/Enabled}"
					id="_Z2IC_A_002_DEPART_input"
					items="{Regiones>/results}"
					>
					<core:Item key="{Regiones>Bland}" text="{Regiones>Bezei}" 
					/>
					   	<layoutData>
				<l:GridData span="L6 M12 S12" />
			</layoutData>
				</ComboBox>
-->

		<VBox>
   <Label text="{i18n>Z2IC.VA_003_FECHAMP}" id="A_003_FECHAMP" class="sap07leter"/>
   <DatePicker id="_Z2IC_A_003_FECHAMP_date" value="{Z2ICModel>/A_003_FECHAMP}" enabled="false" displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange" tooltip="{i18n>Z2IC.A_003_FECHAMP}">
  
   </DatePicker>
      	<layoutData>
		<l:GridData span="L2 M2 S2" moveForward="L4 M2 S2" />
	</layoutData> 
    </VBox>
   </l:Grid>

   <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion">	
        
        <VBox>
         <Label text="{i18n>Z2IC.VA_001_MUNODIS}" id="A_001_MUNODIS">
   </Label>
    <Input id="_Z2IC_A_001_MUNODIS_input" value="{Z2ICModel>/A_001_MUNODIS}" enabled="false" change="onChange"/>
   	<!-- 
      	      	      <ComboBox
	            selectedKey = "{Z2ICModel>/A_001_MUNODIS}"
					width="100%"  placeholder="Seleccione la regiun o municipio" tooltip="Seleccione la regiun o municipio"
					   enabled="{EnabledModel>/Enabled}"
					id="_Z2IC_A_001_MUNODIS_input"
					items="{Ciudades>/results}"
					>
					<core:Item key="{Ciudades>CityCode}" text="{Ciudades>CityName}" 
					/>

				</ComboBox>  -->
									   	<layoutData>
			<l:GridData span="L6 M9 S9" />
			</layoutData>
				</VBox>
   
   <!-- 
   <Input id="_Z2IC_A_001_MUNODIS_input" value="{Z2ICModel>/A_001_MUNODIS}" enabled="{EnabledModel>/Enabled}" change="onChange">
   	
   	
   	<layoutData>
		<l:GridData span="L6 M9 S9" />
	</layoutData>
	</Input>
        -->

		 <VBox>	
	     <Label text="{i18n>Z2IC.VA_004_ANOGRAV}" id="A_004_ANOGRAV" tooltip="{i18n>Z2IC.A_004_ANOGRAV}">

   		</Label>
  
   <Input id="_Z2IC_A_004_ANOGRAV_input" value="{Z2ICModel>/A_004_ANOGRAV}" enabled="false"/>
		
			  <!--   <ComboBox 
	            selectedKey = "{Z2ICModel>/A_004_ANOGRAV}"  enabled="false" tooltip="{i18n>Z2IC.A_004_ANOGRAV}" 
					width="100%"  change="onChangeAnoGravable" 
					   class="sapDireccion" visible="{VIAVisible>/visible}"
					id="_Z2IC_A_004_ANOGRAV_input"
					items="{Periodo>/results}"
					>
					<core:Item key="{Periodo>Persl}" text="{Periodo>Persl}" class="letraDireccion"
					/>
				
				</ComboBox>
				 -->

  	<layoutData>
		<l:GridData span="L2 M9 S9" moveForward="L4 M2 S2" />
	</layoutData>
  		</VBox>
  		
	 <VBox>
	   <Label text="{i18n>Z2IC.OPUSO}">   
	   </Label>
      <RadioButtonGroup id="opcionUso" columns="2" width="100%"  select="opcionUsoSelect" class="sapUiMediumMarginBottom">
  		<buttons>
                <RadioButton id="opcionUso_input1" text="{i18n>Z2IC.VDECIN}" change="onChange" useEntireWidth="true" width="50%" tooltip="{i18n>Z2IC.DECIN}" enabled="{EnabledModel>/Enabled}">
	   </RadioButton>              
   <!--              <RadioButton id="opcionUso_input2" text="Solo Pago" change="onChange" useEntireWidth="true" width="33%">
	   </RadioButton>   -->
   		        <RadioButton id="opcionUso_input3" text="{i18n>Z2IC.VCORR}" change="onChange" useEntireWidth="true" width="50%" tooltip="{i18n>Z2IC.CORREC}" enabled="{EnabledModel>/Enabled}">
	   </RadioButton> 
	   
   		</buttons>  
  		</RadioButtonGroup>
  		<layoutData>
		<l:GridData span="L8 M9 S9" linebreak="true" />
		</layoutData>
  		</VBox>
  		
  	<VBox>
  	  <Label type="Number" text="{i18n>Z2IC.VA_007_DECLANUM}" id="A_007_DECLANUM">	  
  	  </Label>
     <Input id="_Z2IC_A_007_DECLANUM_input" value="{Z2ICModel>/A_007_DECLANUM}" enabled="{OUSOVisible>/visible}" change="onChange" tooltip="{i18n>Z2IC.A_007_DECLANUM}">

	   </Input>
	          <layoutData>
		<l:GridData span="L2 M9 S9" />
	   </layoutData> 
	    </VBox>
	   <VBox> 
     <Label text="{i18n>Z2IC.VA_008_FECHACD}" id="A_008_FECHACD">
     </Label>
     <DatePicker id="_Z2IC_A_008_FECHACD_date" value="{Z2ICModel>/A_008_FECHACD}" enabled="{OUSOVisible>/visible}" displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange" tooltip="{i18n>Z2IC.A_008_FECHACD}">
	   </DatePicker>
	   <layoutData>
		<l:GridData span="L2 M9 S9" />
	   </layoutData> 
	   </VBox>	
  		</l:Grid>
</Panel>
 <Panel expandable="true" expanded="true" headerText="{i18n>Z2IC.VTTIFOCONT}" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
    <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion"  vSpacing="0">	
   	

   	<Label text="{i18n>Z2IC.VA_086_NOMORS}"  id="A_086_NOMORS">
   	    	   <layoutData>
		<l:GridData span="L4 M12 S12" />
	   </layoutData>
   	</Label>
      <Input id="_Z2IC_A_086_NOMORS_input" value="{Z2ICModel>/A_086_NOMORS}" enabled="false" change="onChange">
    	    	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>     
      </Input>


   	<VBox>
    <Label text= "2. CC">
    </Label>
   <CheckBox id="_Z2IC_A_61_CC_input" value="{Z2ICModel>/A_61_CC}" enabled="false" change="onChange">
	   </CheckBox>
	    <layoutData>
		<l:GridData span="L1 M12 S12" />
	   </layoutData> 
	</VBox>
	
	<VBox alignItems="Center">
   <Label text="NIT" id="A_62_NIT">
   </Label>
   <CheckBox id="_Z2IC_A_62_NIT_input" value="{Z2ICModel>/A_62_NIT}" enabled="false" change="onChange">
   </CheckBox>        
        <layoutData>
		<l:GridData span="L1 M12 S12" />
	   </layoutData> 
   </VBox>
   <VBox alignItems="Center">
   <Label text="TI" id="A_63_TT">
   </Label>
   <CheckBox id="_Z2IC_A_63_TT_input" value="{Z2ICModel>/A_63_TT}" enabled="false" change="onChange">
   </CheckBox>
      	<layoutData>
		<l:GridData span="L1 M12 S12" />
	   </layoutData>    
   </VBox>
   <VBox alignItems="Center">
   <Label text="CE" id="A_64_CE">
   </Label>
   <CheckBox id="_Z2IC_A_64_CE_input" value="{Z2ICModel>/A_64_CE}" enabled="false" change="onChange">
   </CheckBox>
        <layoutData>
		<l:GridData span="L1 M12 S12" />
	   </layoutData>
   </VBox>

   <VBox>
 <Label text="No. " id="A_006_ID_NUMBER">
 </Label>
   <Input id="_Z2IC_A_006_ID_NUMBER_input" value="{Z2ICModel>/A_006_ID_NUMBER}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_006_ID_NUMBER}"/>
           <layoutData>
		<l:GridData span="L2 M12 S12" />
	   </layoutData>
   </VBox>
      <VBox>
      <Label text="DV. " id="A_57_DV"/>
   <Input id="_Z2IC_A_57_DV_input" value="{Z2ICModel>/A_57_DV}" enabled="false" change="onChange"/>
           <layoutData>
		<l:GridData span="L1 M12 S12" />
	   </layoutData>
   </VBox>
   
   
      <VBox class="sapCenter" alignItems="Center">   
    <Label text="{i18n>Z2IC.VA_59_CONSO_UTEMPORAL}" id="A_59_CONSO_UTEMPORAL" class="sap063leter"/>
   <CheckBox id="_Z2IC_A_59_CONSO_UTEMPORAL_input" value="{Z2ICModel>/A_59_CONSO_UTEMPORAL}" enabled="{EnabledModel>/Enabled}" change="onChange" select="onSelectConsorcio" />
           <layoutData>
		<l:GridData span="L2 M12 S12" />
	   </layoutData>   
   </VBox>
        <VBox class="sapCenter" alignItems="Center">
   <Label text="{i18n>Z2IC.VA_60_ACT_PATRIMONIO}" id="A_60_ACT_PATRIMONIO" class="sap063leter"/>
   <CheckBox id="_Z2IC_A_60_ACT_PATRIMONIO_input" value="{Z2ICModel>/A_60_ACT_PATRIMONIO}" enabled="{EnabledModel>/Enabled}" change="onChange" select="onSelectPatAutonomo"/>
            <layoutData>
		<l:GridData span="L3 M12 S12" />
	   </layoutData>
 </VBox>
      
   <Label text="{i18n>Z2IC.VA_010_DIRNOTF}" id="A_010_DIRNOTF">
              <layoutData>
		<l:GridData span="L3 M12 S12" linebreak="true"/>
	   </layoutData>
   </Label>
   <Input id="_Z2IC_A_010_DIRNOTF_input" value="{Z2ICModel>/A_010_DIRNOTF}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_010_DIRNOTF}" >
	   <layoutData>
		<l:GridData span="L7 M12 S12"   />
	   </layoutData>    
   </Input>
   
   	<Button
	text="{i18n>Z2IC.TTMODDIR}" enabled="{EnabledModel>/Enabled}"
	press="onPressNewAdress" 
	class="sapUiSmallMarginBottom  sapUmcConsumptionSegmentedButton" >
	<layoutData>
		<l:GridData span="L2 M12 S12" />
	</layoutData>
	</Button>	
	
	</l:Grid>
<!--  INICIO MODIFICACIoN DE DIRECCIoN -->	

 	<Panel expandable="false" expanded="true" headerText="{i18n>ZDIR.TITULODIRNOT}" width="auto" class="sapUiResponsiveMargin sapUmcWhiteBackgroundColor " visible="{DIRVisible2>/visible}">
						
		 <l:Grid defaultSpan="L1 M4 S6" class="sapUiSmallMargin sapDireccion" vSpacing="0" hSpacing="0.1">	
			<l:content>
			<Text text="{i18n>ZDIR.AYUDA}" style="H2">
				<layoutData>
						<l:GridData span="L12 M12 S12" />
				</layoutData>
			</Text>
			
			<Title text="{i18n>ZDIR.VIAPRINC}" style="H2"  visible="{DIRVisible>/visible}"
				class=" sapUmcMLabelBold  sapDireccion ">
				<layoutData>
					<l:GridData span="L12 M12 S12" />
				</layoutData>
			</Title>
	
	<VBox>
			   <Label text="{i18n>ZDIR.VIA}" id="A_01_VIAZ2IC" visible="{VIAVisible>/visible}" class="sapDireccion"/>
			   <ComboBox 
	            selectedKey = "{ZDIRModel>/A_01_VIA}"  enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class="sapDireccion" visible="{VIAVisible>/visible}"
					id="_ZDIR_A_01_VIA_inputZ2IC"
					items="{Via>/results}"
					>
					<core:Item key="{Via>Via}" text="{Via>Descripcion}" class="letraDireccion"
					/>
				
				</ComboBox>
				<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
	</VBox>
	
	<VBox>
				<Label text="{i18n>ZDIR.NUMVIA}" id="A_02_NUMVIAZ2IC" width="100%" class="sapDireccion"
				visible="{DIRVisible>/visible}">
			</Label>
		
			<MaskInput mask = "999" id="_ZDIR_A_02_NUMVIA_inputZ2IC" width="100%"
				value="{ZDIRModel>/A_02_NUMVIA}" enabled="{EnabledModel>/Enabled}"
				change="onChangeDireccion" class="sapDireccion"
				visible="{DIRVisible>/visible}">
			</MaskInput>
	</VBox>
	<VBox>
			<Label text="Letra" id="A_03_LETRAVIAZ2IC" visible="{DIRVisible>/visible}"  class="sapDireccion"/>
				<ComboBox
	            selectedKey = "{ZDIRModel>/A_03_LETRAVIA}"  enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class="sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_03_LETRAVIA_inputZ2IC"
					items="{LetraVia>/results}"
					>
					<core:Item key="{LetraVia>Letra}" text="{LetraVia>Letra}" 
					/>
				</ComboBox>

	</VBox>
	<VBox>
	<Label text="Numero Sec." id="A_04_NUMSECVIAZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			<MaskInput mask = "99" id="_ZDIR_A_04_NUMSECVIA_inputZ2IC" visible="{DIRVisible>/visible}" width="100%"
				value="{ZDIRModel>/A_04_NUMSECVIA}" class="sapDireccion"
				enabled="{EnabledModel>/Enabled}" change="onChangeDireccion" />
			

	</VBox>
	<VBox>
				<Label text="Letra Sec" id="A_05_LETRASECVIAZ2IC" visible="{DIRVisible>/visible}" class="sapDireccion"/>
				<ComboBox
	            selectedKey = "{ZDIRModel>/A_05_LETRASECVIA}" enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class="sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_05_LETRASECVIA_inputZ2IC"
					items="{LetraVia>/results}"
					>
					<core:Item key="{LetraVia>Letra}" text="{LetraVia>Letra}" 
					/>
				</ComboBox> 
		</VBox>
<VBox>
	<Label text="Bis" id="A_06_BISVIAZ2IC" visible="{DIRVisible>/visible}" class="sapDireccion"/>
			 <ComboBox
	            selectedKey = "{ZDIRModel>/A_06_BISVIA}" enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class="sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_06_BISVIA_inputZ2IC"
					items="{Bis>/results}"
					>
					<core:Item key="{Bis>Letra}" text="{Bis>Descripcion}"  class="sapDireccion"
					/>
				</ComboBox>
				
			</VBox>


			<VBox>
			<Label text="Sector" id="A_07_SECTORVIAZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			 <ComboBox
	            selectedKey = "{ZDIRModel>/A_07_SECTORVIA}" enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class=" sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_07_SECTORVIA_inputZ2IC"
					items="{Sector2>/results}"
					>
					<core:Item key="{Sector2>Letra}" text="{Sector2>Descripcion}" 
					/>				
				</ComboBox>
									<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
			</VBox>

	
			<Title text="Placa" style="H2"  visible="{DIRVisible>/visible}"
				class=" sapUmcMLabelBold sapDireccion">
				<layoutData>
					<l:GridData span="L12 M12 S12" />
				</layoutData>
			</Title>		
	<VBox>
			<Label text="Cruce" id="A_08_CRUCEZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			<ComboBox
	            selectedKey = "{ZDIRModel>/A_08_CRUCE}" enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class=" sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_08_CRUCE_inputZ2IC"
					items="{Via>/results}"
					>
					<core:Item key="{Via>Via}" text="{Via>Descripcion}" 
					/>

				</ComboBox>
				<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
				</VBox>
<VBox>
			<Label text="Numero Cruce" id="A_09_NUMCRUCEZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>

				

				
 			<MaskInput mask = "999" id="_ZDIR_A_09_NUMCRUCE_inputZ2IC" visible="{DIRVisible>/visible}" width="100%"
				value="{ZDIRModel>/A_09_NUMCRUCE}" enabled="{EnabledModel>/Enabled}" 
				change="onChangeDireccion" class="sapDireccion"/>
				
				</VBox>
				
	<VBox>			
			<Label text="Letra Cruce" id="A_10_LETRACRUCEZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			 <ComboBox
	            selectedKey = "{ZDIRModel>/A_10_LETRACRUCE}"  enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class=" sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_10_LETRACRUCE_inputZ2IC"
					items="{LetraVia>/results}"
					>
					<core:Item key="{LetraVia>Letra}" text="{LetraVia>Letra}" 
					/>
				</ComboBox>
				</VBox>

<VBox>
			<Label text="Numero Sec Cruce" id="A_11_NUMSECCRUCEZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			<MaskInput mask = "99"  id="_ZDIR_A_11_NUMSECCRUCE_inputZ2IC" visible="{DIRVisible>/visible}" width="100%"
				value="{ZDIRModel>/A_11_NUMSECCRUCE}"  class="sapDireccion"
				enabled="{EnabledModel>/Enabled}" change="onChangeDireccion" />
				</VBox>
				
<VBox>			
			<Label text="Letra Sec Cruce" id="A_12_LETRASECCRUCEZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			<ComboBox
	            selectedKey = "{ZDIRModel>/A_12_LETRASECCRUCE}"  enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class=" sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_12_LETRASECCRUCE_inputZ2IC"
					items="{LetraVia>/results}"
					>
					<core:Item key="{LetraVia>Letra}" text="{LetraVia>Letra}" 
					/>
				</ComboBox>
				</VBox>

<VBox>
			<Label text="Bis" id="A_13_BISCRUCEZ2IC" visible="{DIRVisible>/visible}" class="sapDireccion" />
			<ComboBox
	            selectedKey = "{ZDIRModel>/A_13_BISCRUCE}"  enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class=" sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_13_BISCRUCE_inputZ2IC"
					items="{Bis>/results}"
					>
					<core:Item key="{Bis>Letra}" text="{Bis>Descripcion}" 
					/>
				</ComboBox>
				</VBox>
<VBox>		
			<Label text="Sector" id="A_14_SECTORCRUCEZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
		    <ComboBox
	            selectedKey = "{ZDIRModel>/A_14_SECTORCRUCE}" 
					width="100%"  change="onChangeDireccion" enabled="{EnabledModel>/Enabled}"
					   class=" sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_14_SECTORCRUCE_inputZ2IC"
					items="{Sector2>/results}"
					>
					<core:Item key="{Sector2>Letra}" text="{Sector2>Descripcion}" 
					/>
					
				</ComboBox>
									<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
				</VBox>
<VBox>
			<Label text="Ultimo Digito Paca" id="A_15_ULTDIGPLACAZ2IC" visible="{DIRVisible>/visible}" class="sapDireccion"/>
			<MaskInput mask = "999" id="_ZDIR_A_15_ULTDIGPLACA_inputZ2IC" visible="{DIRVisible>/visible}"
				value="{ZDIRModel>/A_15_ULTDIGPLACA}" class="sapDireccion"
				enabled="{EnabledModel>/Enabled}" change="onChangeDireccion" />	
								<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
	</VBox>
	
				<Title text="Interior" style="H2"  visible="{DIRVisible>/visible}" 
				class=" sapUmcMLabelBold  sapDireccion">
				<layoutData>
					<l:GridData span="L12 M12 S12" />
				</layoutData>
			</Title>	
	<VBox>
		<Label text="Bloque" id="A_16_BLOQUEZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/> 
			<MaskInput  mask = "~~~"  id="_ZDIR_A_16_BLOQUE_inputZ2IC" visible="{DIRVisible>/visible}" width="100%"
				value="{ZDIRModel>/A_16_BLOQUE}" enabled="{EnabledModel>/Enabled}" class="sapDireccion"
				change="onChangeDireccion"  maxLength="3">
				<rules>
						<MaskInputRule maskFormatSymbol="~" regex="[^_]"/>
					</rules>
				</MaskInput>
				</VBox>
		<VBox>		
			<Label text="Piso" id="A_17_PISOZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			<MaskInput  mask = "99" id="_ZDIR_A_17_PISO_inputZ2IC" visible="{DIRVisible>/visible}" width="100%" class="sapDireccion"
				value="{ZDIRModel>/A_17_PISO}" enabled="{EnabledModel>/Enabled}"
				change="onChangeDireccion"  maxLength="2"/>
		</VBox>
		<VBox>		
			<Label text="Unidad" id="A_18_UNIDADZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			<MaskInput mask = "99" id="_ZDIR_A_18_UNIDAD_inputZ2IC" visible="{DIRVisible>/visible}" width="100%"
				value="{ZDIRModel>/A_18_UNIDAD}" enabled="{EnabledModel>/Enabled}" class="sapDireccion"
				change="onChangeDireccion" />
				</VBox>
				
		<VBox>		
			<Label text="Tipo Unidad" id="A_19_DESUNIDADZ2IC"  visible="{DIRVisible>/visible}" class="sapDireccion"/>
			 <ComboBox
	            selectedKey = "{ZDIRModel>/A_19_DESUNIDAD}"  enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion" 
					   class=" sapDireccion" visible="{DIRVisible>/visible}"
					id="_ZDIR_A_19_DESUNIDAD_inputZ2IC"
					items="{Unidad>/results}"
					>
					<core:Item key="{Unidad>Letra}" text="{Unidad>Descripcion}" 
					/>
				</ComboBox>
				<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
				
				</VBox>
				
		<VBox>
			   <Label text="Via Rural" id="A_26_DIRNUMRURZ2IC" visible="{RURALVisible>/visible}" class="sapDireccion" />
			   <ComboBox 
			  		selectedKey = "{ZDIRModel>/A_26_DIRNUMRUR}" 
	              enabled="{EnabledModel>/Enabled}"
					width="100%"  change="onChangeDireccion"  value="{ZDIRModel>/A_26_DIRNUMRUR}"
					   class=" sapDireccion" visible="{RURALVisible>/visible}"
					id="_ZDIR_A_26_DIRNUMRUR_inputZ2IC"
					items="{ViaRural>/results}"
					>
					<core:Item key="{ViaRural>Viarural}" text="{ViaRural>Descripcion}" class="letraDireccion"
					/>
				</ComboBox>
				<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
			</VBox>
		<VBox>
			   <Label text="Direccion Rural" id="A_25_DIRRURAZ2IC" visible="{RURALVisible>/visible}" class="sapDireccion"/>
			<Input id="_ZDIR_A_25_DIRRURAL_inputZ2IC"  visible="{RURALVisible>/visible}"  class="sapDireccion" value="{ZDIRModel>/A_25_DIRRURAL}"
				enabled="{EnabledModel>/Enabled}" change="onChangeDireccion">
			
		  </Input> 	
			<layoutData>
					<l:GridData span="L8 M12 S12" />
				</layoutData>			
		</VBox>
	
					
				<Title text="{i18n>ZDIR.NDIR}" style="H2"  visible="{CDVisible>/visible}"
				class="sapUmcMLabelBold  sapDireccion">
				<layoutData>
					<l:GridData span="L12 M12 S12" />
				</layoutData>
				</Title>
			
				<Button
				text="{i18n>ZDIR.VDIR}" enabled="{EnabledModel>/Enabled}" 
				press="onShowAdress" visible="{VIAVisible>/visible}" 
				class="sapUiSmallMarginBottom" > 
				<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
				</Button>
				
				<Button
				text="{i18n>ZDIR.BDIR}" enabled="{EnabledModel>/Enabled}"
				press="onEraseAdress" visible="{VIAVisible>/visible}" 
				class="sapUiSmallMarginBottom" >
				<layoutData>
					<l:GridData span="L2 M12 S12" />
				</layoutData>
				</Button>		

				<VBox>
				<Title text="{i18n>ZDIR.DIRECC}" style="H2"  visible="{DIRVisible>/visible}"
				class="sapUmcMLabelBold  sapDireccion">
				</Title>
   				<Input id="_ZDIR_A_24_DIRECCIONCORREGIDA_inputZ2IC" value="{ZDIRModel>/A_29_DIRPANTALLA}" visible="{VIAVisible>/visible}" change="onChangeDireccion" enabled="false">
 
				</Input>
				<layoutData>
					<l:GridData span="L7 M12 S12" />
				</layoutData>
				</VBox>
				
				
	</l:content>
	</l:Grid>         			 
	</Panel>	
	
<!--  FIN MODIFICACIoN DE DIRECCIoN -->	
    <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion"  vSpacing="0">	
	<HBox alignItems="Center">   	
   <Label text="{i18n>Z2IC.VA_012_DEP_DIRNOTF}" id="A_012_DEP_DIRNOTF">
   
   </Label>
     	      	      <ComboBox
	            selectedKey = "{Z2ICModel>/A_012_DEP_DIRNOTF}"
					width="100%" change="Region2Select" placeholder="{i18n>Z2IC.TTA_012_DEP_DIRNOTF}" tooltip="{i18n>Z2IC.TTA_012_DEP_DIRNOTF}"
					   enabled="{EnabledModel>/Enabled}"
					id="_Z2IC_A_012_DEP_DIRNOTF_input"
					items="{Regiones>/results}"
					>
					<core:Item key="{Regiones>Bland}" text="{Regiones>Bezei}" 
					/>

		</ComboBox>
  					   	<layoutData>
		<l:GridData span="L5 M9 S9" linebreak="true" />
			</layoutData>
   </HBox>
   
	<HBox alignItems="Center">

   <Label text="{i18n>Z2IC.VA_011_MUN_DIRNOTF}" id="A_011_MUN_DIRNOTF">  
   </Label>
     
         	      	      <ComboBox
	            selectedKey = "{Z2ICModel>/A_011_MUN_DIRNOTF}"
					width="100%"  placeholder="{i18n>Z2IC.TTA_011_MUN_DIRNOTF}" tooltip="{i18n>Z2IC.TTA_011_MUN_DIRNOTF}"
					   enabled="{EnabledModel>/Enabled}" change="onChangeCB"
					id="_Z2IC_A_011_MUN_DIRNOTF_input"
					items="{Ciudades2>/results}"
					>
					<core:Item key="{Ciudades2>CityCode}" text="{Ciudades2>CityName}" 
					/>

				</ComboBox>
								   	<layoutData>
			<l:GridData span="L6 M9 S9" />
			</layoutData>	
	   
			 	</HBox>
		<!--  		
   <Input id="_Z2IC_A_011_MUN_DIRNOTF_input" value="{Z2ICModel>/A_011_MUN_DIRNOTF}" enabled="{EnabledModel>/Enabled}" change="onChange">
   </Input>
   	   <layoutData>
		<l:GridData span="L7 M9 S9"  />
	   </layoutData>    
  
-->

   <VBox>
   <Label text="{i18n>Z2IC.VA_013_TELEFONO}" id="A_013_TELEFONO">   
   </Label>
   <Input type="Number" id="_Z2IC_A_013_TELEFONO_input" value="{Z2ICModel>/A_013_TELEFONO}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_013_TELEFONO}">
   </Input>
   	   <layoutData>
		<l:GridData span="L2 M9 S9" />
	   </layoutData>
      </VBox>
      
    <VBox>
   <Label text="{i18n>Z2IC.VA_014_EMAIL}" id="A_014_EMAIL">
   </Label>
   <Input id="_Z2IC_A_014_EMAIL_input" value="{Z2ICModel>/A_014_EMAIL}" enabled="{EnabledModel>/Enabled}"  change="validateEmail" tooltip="{i18n>Z2IC.A_014_EMAIL}">
   </Input>
	   <layoutData>
		<l:GridData span="L5 M9 S9" />
	   </layoutData>    
   </VBox> 
   <VBox>
   <Label text="{i18n>Z2IC.VA_015_NOESTABTS}" id="A_015_NOESTABTS"> 
   </Label>
   <Input  type="Tel" id="_Z2IC_A_015_NOESTABTS_input" value="{Z2ICModel>/A_015_NOESTABTS}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_015_NOESTABTS}" maxLength="3">
   </Input>
   	   <layoutData>
		<l:GridData span="L3 M9 S9" />
	   </layoutData>    
   </VBox> 
   <VBox>
   <Label text="{i18n>Z2IC.VA_016_CLASIFICACION}" id="A_016_CLASIFICACION">
   </Label>
   <Input id="_Z2IC_A_016_CLASIFICACION_input" value="{Z2ICModel>/A_016_CLASIFICACION}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_016_CLASIFICACION}">   
   </Input>
	   <layoutData>
		<l:GridData span="L2 M9 S9" />
	   </layoutData>       
   </VBox>
  </l:Grid>
 </Panel>
  

 <Panel expandable="true" expanded="true" headerText="B. BASE GRABABLE" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
   
   <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion"  vSpacing="0">	
         <Label text="{i18n>DESC}" class="sapUmcMLabelBold">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>      
   
   <Label text="{i18n>Z2IC.VA_017_TIOYEPTP}" id="A_017_TIOYEPTP" >
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>

   <Input id="_Z2IC_A_017_TIOYEPTP_input" maxLength="19" value="{path: 'Z2ICModel>/A_017_TIOYEPTP', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}, constraints:{minimum:0}}" enabled="{EnabledModel>/Enabled}" change="onChange" class="sapAlignRight" tooltip="{i18n>Z2IC.A_017_TIOYEPTP}">
<!--  -->
   	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>    
   </Input>
   
      <Input id="_Z2IC_A_017_TIOYEPTP_inputLIQ"  value="{path: 'Z2ICModel>/A_017_TIOYEPTP', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}, constraints:{minimum:0}}" enabled="false" change="onChange" class="sapAlignRight" tooltip="{i18n>Z2IC.A_017_TIOYEPTP}">

   	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>    
   </Input>
   
   <Label text="{i18n>Z2IC.VA_018_MIOYEM}" id="A_018_MIOYEM">
   	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_018_MIOYEM_input"   maxLength="19" value="{path: 'Z2ICModel>/A_018_MIOYEM', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" tooltip="{i18n>Z2IC.A_018_MIOYEM}"
        enabled="{EnabledModel>/Enabled}" change="onChange">
   	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_018_MIOYEM_inputLIQ"  value="{path: 'Z2ICModel>/A_018_MIOYEM', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" tooltip="{i18n>Z2IC.A_018_MIOYEM}"
        enabled="false" change="onChange">
   	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>
   <Label text="{i18n>Z2IC.VA_019_TIOYEM}" id="A_019_TIOYEM">
     	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_019_TIOYEM_input"    maxLength="19" value="{path: 'Z2ICModel>/A_019_TIOYEM', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_019_TIOYEM}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_128_LIQ_TIOYEM_input"  value="{path: 'Z2ICModel>/A_128_LIQ_TIOYEM', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_019_TIOYEM}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>
   </Input>
   
   
   <Label text="{i18n>Z2IC.VA_020_MIPDRD}" id="A_020_MIPDRD">
       <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_020_MIPDRD_input"  maxLength="19" value="{path:'Z2ICModel>/A_020_MIPDRD', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_020_MIPDRD}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_020_MIPDRD_inputLIQ" value="{path:'Z2ICModel>/A_020_MIPDRD', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_020_MIPDRD}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>   
   <Label text="{i18n>Z2IC.VA_021_MIPE}" id="A_021_MIPE">
          <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_021_MIPE_input"  maxLength="19" value="{path:'Z2ICModel>/A_021_MIPE', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_021_MIPE}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>     
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_021_MIPE_inputLIQ" value="{path:'Z2ICModel>/A_021_MIPE', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_021_MIPE}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>     
   </Input>
   <Label text="{i18n>Z2IC.VA_022_MIPVDAC}" id="A_022_MIPVDAC">
            <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData> 
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_022_MIPVDAC_input"  maxLength="19" value="{path:'Z2ICModel>/A_022_MIPVDAC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false,source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_022_MIPVDAC}">
      	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_022_MIPVDAC_inputLIQ" value="{path:'Z2ICModel>/A_022_MIPVDAC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false,source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_022_MIPVDAC}">
      	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Label text="{i18n>Z2IC.VA_023_MIOAESAING}" id="A_023_MIOAESAING">
             <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData> 
   </Label>
   <Input class="sapAlignRight"  id="_Z2IC_A_023_MIOAESAING_input"   maxLength="19" value="{path:'Z2ICModel>/A_023_MIOAESAING', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_023_MIOAESAING}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
      <Input class="sapAlignRight"  id="_Z2IC_A_023_MIOAESAING_inputLIQ" value="{path:'Z2ICModel>/A_023_MIOAESAING', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_023_MIOAESAING}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Label  class="sapAlignRight" text="{i18n>Z2IC.VA_024_MIOAEMD}" id="A_024_MIOAEMD">
            <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData> 
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_024_MIOAEMD_input"   maxLength="19" value="{path:'Z2ICModel>/A_024_MIOAEMD', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_024_MIOAEMD}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
  <Input  class="sapAlignRight" id="_Z2IC_A_024_MIOAEMD_inputLIQ" value="{path:'Z2ICModel>/A_024_MIOAEMD', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_024_MIOAEMD}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>   
   <Label text="{i18n>Z2IC.VA_025_TOTALIG}" id="A_025_TOTALIG">
            <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData> 
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_025_TOTALIG_input"  maxLength="19" value="{path:'Z2ICModel>/A_025_TOTALIG', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_025_TOTALIG}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
     <Input  class="sapAlignRight" id="_Z2IC_A_126_LIQ_TOTALIG_input" showValueHelp="true" value="{path:'Z2ICModel>/A_126_LIQ_TOTALIG', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_025_TOTALIG}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input> 
   
   
     </l:Grid>
   </Panel>
   
    <Panel expandable="true" expanded="true" headerText="{i18n>Z2IC.VDISCACTGRA}" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
 <!-- 
   <t:Table attachRowSelectionChange="ModifyActividadesZ2ICfromTable"
				rows="{Actividades>/Valores}"
				title="Actividades" selectionMode="None" id="TableActividades001"  
				visibleRowCount="3"> 
				<t:columns>
					<t:Column width="19%">
						<Label text="{i18n>Z2IC.VCOL1}" />
						<t:template>
							<Text text="{Actividades>Name}" wrapping="false" />
						</t:template>
					</t:Column>
					<t:Column width="23.5%">
						<Label text="{i18n>Z2IC.VCOL1}" id="A_072_R1_CODIGO"/>
						<t:template>
      	      	 
						       	 
      	      	      <ComboBox
      	      	      showSecondaryValues= "true" id="_A_072_R1_CODIGO_input"
      	      	      filterSecondaryValues= "true"
      	      	      value = "{Actividades>Codigo}"
	            	selectedKey = "{Actividades>Codigo}"
					 placeholder="Actividad" tooltip="{i18n>Z2IC.A_072_R1_CODIGO}"
					   enabled="{EnabledModel>/Enabled}"
					
					items="{
						path: 'ActividadesICA>/results',
						sorter: { path: 'text' }					
					}"
					>
					<core:ListItem key="{ActividadesICA>CodAct}" additionalText="{ActividadesICA>Descrip}" text="{ActividadesICA>CodAct}"
					/>
						</ComboBox>
						

		
						</t:template>
					</t:Column>
					<t:Column width="23.5%" hAlign="End">
						<Label text="{i18n>Z2IC.VCOL2}" />
						<t:template>
						
						       <Input  class="sapAlignRight" value="{path:'Actividades>Ingresos', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_073_R1_ING_GRAVADOS}"/> 
						</t:template>
					</t:Column>
					<t:Column width="16%" hAlign="End">
						<Label text="{i18n>Z2IC.VCOL3}" />
						<t:template>
								       <Input  class="sapAlignRight" value="{path:'Actividades>Tarifas', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_074_R1_TARIFA}"/> 
				
						</t:template>
					</t:Column>
					<t:Column width="18%" hAlign="End">
						<Label text="{i18n>Z2IC.VCOL4}" />
						<t:template>
						       <Input  class="sapAlignRight" value="{path:'Actividades>Impuesto', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_075_R1_IMPUESTO}"/> 
						</t:template>
					</t:Column>
				</t:columns>
			</t:Table>
			-->	
			
         	<l:Grid defaultSpan="L12 M12 S12" class="sapDireccion" id="CActGrav">	
         	</l:Grid>
         				
 <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion" vSpacing="0">		


      <Label text="{i18n>DESC}" class="sapUmcMLabelBold">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>     


         		<Label text="{i18n>Z2IC.VA_026_TOTALIGAG}" id="A_026_TOTALIGAG">
	   	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>  
	</Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_026_TOTALIGAG_input"  maxLength="17" value="{path:'Z2ICModel>/A_026_TOTALIGAG', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_026_TOTALIGAG}">
   	   <layoutData>
		<l:GridData span="L2 M12 S12" />
	   </layoutData>       
   </Input>
   
   	<Input  class="sapAlignRight" id="_Z2IC_A_125_LIQ_TOTALIGAG_input" value="{path:'Z2ICModel>/A_125_LIQ_TOTALIGAG', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_026_TOTALIGAG}">
   	   <layoutData>
		<l:GridData span="L2 M12 S12" />
	   </layoutData>       
   </Input>
   
   
   <Label  class="sapAlignRight" text="{i18n>Z2IC.VA_027_TOTALIMPUESTO}" id="A_027_TOTALIMPUESTO">
   	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>    
   </Label>
   <Input   class="sapAlignRight" id="_Z2IC_A_027_TOTALIMPUESTO_input"  maxLength="17" value="{path:'Z2ICModel>/A_027_TOTALIMPUESTO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_027_TOTALIMPUESTO}">
   	   <layoutData>
		<l:GridData span="L2 M12 S12" />
	   </layoutData>    
   </Input>
      <Input   class="sapAlignRight" id="_Z2IC_A_124_LIQ_TOTALIMPUESTO_input" value="{path:'Z2ICModel>/A_124_LIQ_TOTALIMPUESTO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_027_TOTALIMPUESTO}">
   	   <layoutData>
		<l:GridData span="L2 M12 S12" />
	   </layoutData>    
   </Input>	  
   
   <!-- 
	<Label text="{i18n>Z2IC.VA_125_LIQ_TOTALIGAG}" >
	   	   <layoutData>
		<l:GridData span="L5 M9 S9" />
	   </layoutData>  
	</Label>

   <Label  class="sapAlignRight" text="{i18n>Z2IC.VA_124_LIQ_TOTALIMPUESTO}" >
   	   <layoutData>
		<l:GridData span="L3 M9 S9" />
	   </layoutData>    
   </Label>	   
  -->
	
	<!-- 
   <Label text="{i18n>Z2IC.VA_028_IMPUESTOLEY2}" id="A_028_IMPUESTOLEY2" >
      	   <layoutData>
		<l:GridData span="L10 M9 S9" />
	   </layoutData> 
   </Label>   
   
   
      	<Button
	text="{i18n>Z2IC.BMASACT}" enabled="{EnabledModel>/Enabled}"
	press="onPressNewActivity"
	class="sapUiSmallMarginBottom  sapUmcConsumptionSegmentedButton sap08leter" >
	<layoutData>
		<l:GridData span="L2 M12 S12" />
	</layoutData>
	</Button>	
	-->
	
	<!--  CAMPO DESHABILITADO PARA LA ALCALDIA DE CALI
   <Label text="19. IMPUESTO LEY 56 DE 1981" id="A_028_IMPUESTOLEY">
      	   <layoutData>
		<l:GridData span="L10 M9 S9" />
	   </layoutData> 
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_028_IMPUESTOLEY_input" value="{path:'Z2ICModel>/A_028_IMPUESTOLEY', type:'sap.ui.model.type.Currency', formatOptions:{showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange">
      	   <layoutData>
		<l:GridData span="L2 M9 S9" />
	   </layoutData>  
 	</Input> -->
 	</l:Grid>
			</Panel>
			
    <Panel expandable="true" expanded="true" headerText="{i18n>Z2IC.VTITLIQPRI}" width="auto" class="sapUmcVerticalAfterSpacingX0 sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
     <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion"  vSpacing="0">	
      <Label text="{i18n>DESC}" class="sapUmcMLabelBold">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>      
      <Label text="{i18n>Z2IC.VA_029_TOTALIMPIYC}" id="A_029_TOTALIMPIYC" >
    	   <layoutData >
		<l:GridData span="L8 M12 S12" />
	   </layoutData>     
   </Label>

   <Input  class="sapAlignRight"  maxLength="17" id="_Z2IC_A_029_TOTALIMPIYC_input" value="{path:'Z2ICModel>/A_029_TOTALIMPIYC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_029_TOTALIMPIYC}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12" />
	   </layoutData>   
   </Input>
	<Input class="sapAlignRight" id="_Z2IC_A_108_LIQ_TOTALIMPIYC_input" value="{path:'Z2ICModel>/A_108_LIQ_TOTALIMPIYC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
	  enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_029_TOTALIMPIYC}" >
     	   <layoutData >
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>   
   
   <Label text="{i18n>Z2IC.VA_030_IMPUESTOAYT}" id="A_030_IMPUESTOAYT">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_030_IMPUESTOAYT_input"   maxLength="17" value="{path:'Z2ICModel>/A_030_IMPUESTOAYT', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_030_IMPUESTOAYT}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"/>
	   </layoutData>   
   </Input>
    <Input  class="sapAlignRight" id="_Z2IC_A_109_LIQ_IMPUESTOAYT_input"  value="{path:'Z2ICModel>/A_109_LIQ_IMPUESTOAYT', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_030_IMPUESTOAYT}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"/>
	   </layoutData>   
   </Input>  

   <Label text="{i18n>Z2IC.VA_031_PAGOUCASF}" id="A_031_PAGOUCASF">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_031_PAGOUCASF_input"  maxLength="17" value="{path:'Z2ICModel>/A_031_PAGOUCASF', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_031_PAGOUCASF}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_134_LIQ_PAGOUCASF_input" value="{path:'Z2ICModel>/A_134_LIQ_PAGOUCASF', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_031_PAGOUCASF}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
         
   <!-- 
   <Label text="23. SOBRETASA BOMBERIL (Ley 1575 de 2012)(Si la hay, liquidela segun el acuerdo municipal o distrital)" id="A_032_STASABOMBERIL">
    	   <layoutData>
		<l:GridData span="L10 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_032_STASABOMBERIL_input" value="{path:'Z2ICModel>/A_032_STASABOMBERIL', type:'sap.ui.model.type.Currency', formatOptions:{showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_032_STASABOMBERIL}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input> 
   <Label text="24. SOBRETASA DE SEGURIDAD (LEY 1421 de 2011)(Si la hay, liquidela segun el acuerdo municipal o distrital)" id="A_033_STASASEGURIDAD">
    	   <layoutData>
		<l:GridData span="L10 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_033_STASASEGURIDAD_input" value="{path:'Z2ICModel>/A_033_STASASEGURIDAD', type:'sap.ui.model.type.Currency', formatOptions:{showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>-->
   
   <Label text="{i18n>Z2IC.VA_034_TOTALIMPCARGO}" id="A_034_TOTALIMPCARGO">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_034_TOTALIMPCARGO_input"  maxLength="17" value="{path:'Z2ICModel>/A_034_TOTALIMPCARGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_034_TOTALIMPCARGO}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
    <Input  class="sapAlignRight" id="_Z2IC_A_110_LIQ_TOTALIMPCARGO_input" value="{path:'Z2ICModel>/A_110_LIQ_TOTALIMPCARGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_034_TOTALIMPCARGO}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>  
   
   <Label text="{i18n>Z2IC.VA_035_MVEOISING}" id="A_035_MVEOISING">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_035_MVEOISING_input"  maxLength="17" value="{path:'Z2ICModel>/A_035_MVEOISING', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_035_MVEOISING}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>   
   <Input  class="sapAlignRight" id="_Z2IC_A_035_MVEOISING_inputLIQ" value="{path:'Z2ICModel>/A_035_MVEOISING', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_035_MVEOISING}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Label text="{i18n>Z2IC.VA_036_MENOSRETENCIONES}" id="A_036_MENOSRETENCIONES">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_036_MENOSRETENCIONES_input"  maxLength="17" value="{path:'Z2ICModel>/A_036_MENOSRETENCIONES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_036_MENOSRETENCIONES}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_036_MENOSRETENCIONES_inputLIQ" value="{path:'Z2ICModel>/A_036_MENOSRETENCIONES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_036_MENOSRETENCIONES}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
   <Label text="{i18n>Z2IC.VA_037_MENOSAUTORETENC}" id="A_037_MENOSAUTORETENC">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_037_MENOSAUTORETENC_input"  maxLength="17" value="{path:'Z2ICModel>/A_037_MENOSAUTORETENC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_037_MENOSAUTORETENC}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_037_MENOSAUTORETENC_inputLIQ" value="{path:'Z2ICModel>/A_037_MENOSAUTORETENC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_037_MENOSAUTORETENC}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>   
   <!--  
   <Label text="{i18n>Z2IC.VA_038_MENOSALANOANT}" id="A_038_MENOSALANOANT">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_038_MENOSALANOANT_input" value="{path:'Z2ICModel>/A_038_MENOSALANOANT', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_038_MENOSALANOANT_inputLIQ" value="{path:'Z2ICModel>/A_038_MENOSALANOANT', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Label text="{i18n>Z2IC.VA_039_ANTICIPOANOSIG}" id="A_039_ANTICIPOANOSIG">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_039_ANTICIPOANOSIG_input" value="{path:'Z2ICModel>/A_039_ANTICIPOANOSIG', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_039_ANTICIPOANOSIG_inputLIQ" value="{path:'Z2ICModel>/A_039_ANTICIPOANOSIG', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>  
    -->
    <Label text="{i18n>Z2IC.VSECSAN}">
    	   <layoutData>
		<l:GridData span="L6 M12 S12" linebreak="true"/>
	   </layoutData>  	
	   </Label>
 
	   <HBox alignItems="Center">
   <CheckBox  id="_Z2IC_A_65_EXTEMPORANEIDAD_input" value="{Z2ICModel>/A_65_EXTEMPORANEIDAD}" enabled="{EnabledModel>/Enabled}" select="onChangeExt"/>
	<Label text="{i18n>Z2IC.VA_65_EXTEMPORANEIDAD}" id="A_65_EXTEMPORANEIDAD"/>
        <layoutData>
		<l:GridData span="L8 M12 S12"  />
	   </layoutData>   
   </HBox>
	 


   <Input  class="sapAlignRight" id="_Z2IC_A_120_VALSACEXTEMPO_input"   maxLength="17" value="{path:'Z2ICModel>/A_120_VALSACEXTEMPO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"  enabled="{ExtVisible>/visible}" change="onChange" tooltip="{i18n>Z2IC.A_120_VALSACEXTEMPO}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>

   <Input  class="sapAlignRight" id="_Z2IC_A_116_LIQ_VALSACEXTEMPO_input" value="{path:'Z2ICModel>/A_116_LIQ_VALSACEXTEMPO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_120_VALSACEXTEMPO}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>
   
   <HBox alignItems="Center">
    <CheckBox  id="_Z2IC_A_66_SCORRECCION_input" value="{Z2ICModel>/A_66_SCORRECCION}" enabled="{OUSOVisible>/visible}" select="onChangeCORR"/>
      <Label text="{i18n>Z2IC.VA_66_SCORRECCION}" id="A_66_SCORRECCION"/>
          <layoutData>
		<l:GridData span="L8 M12 S12"  />
	   </layoutData>  
    </HBox>
    
    
       <Input  class="sapAlignRight" id="_Z2IC_A_121_VALSANCORREC_input"  maxLength="17" value="{path:'Z2ICModel>/A_121_VALSANCORREC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{CORRVisible>/visible}" change="onChange" tooltip="{i18n>Z2IC.A_121_VALSANCORREC}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>

   <Input  class="sapAlignRight" id="_Z2IC_A_117_LIQ_VALSANCORREC_input" value="{path:'Z2ICModel>/A_117_LIQ_VALSANCORREC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_121_VALSANCORREC}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>
   

  
  
   <HBox alignItems="Center">
  <CheckBox  id="_Z2IC_A_67_INEXACTITUD_input" value="{Z2ICModel>/A_67_INEXACTITUD}" enabled="{EnabledModel>/Enabled}" select="onChangeINEX"/>
      <Label text="{i18n>Z2IC.VA_67_INEXACTITUD}" id="A_67_INEXACTITUD"/>
            <layoutData>
		<l:GridData span="L8 M12 S12"  />
	   </layoutData>  
   </HBox>
  
         <Input  class="sapAlignRight" id="_Z2IC_A_122_VALSANINEXAT_input"  maxLength="17" value="{path:'Z2ICModel>/A_122_VALSANINEXAT', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{INEXVisible>/visible}" change="onChange" tooltip="{i18n>Z2IC.A_122_VALSANINEXAT}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>

   <Input  class="sapAlignRight" id="_Z2IC_A_118_LIQ_VALSANINEXAT_input" value="{path:'Z2ICModel>/A_118_LIQ_VALSANINEXAT', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_122_VALSANINEXAT}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>
   
   

      <HBox alignItems="Center">
   <CheckBox id="_Z2IC_A_68_OTRA_input" value="{Z2ICModel>/A_68_OTRA}" enabled="{EnabledModel>/Enabled}" select="onChangeOTRASancion"/>
 <Label text="OTRA: " id="A_68_OTRA"/>
   <Label text="CUAL: " id="A_69_CUAL_OTRA"/>
   <Input id="_Z2IC_A_69_CUAL_OTRA_input" value="{Z2ICModel>/A_69_CUAL_OTRA}" enabled="{OTRASANVisible>/visible}" change="onChange" />
  
       <layoutData>
		<l:GridData span="L8 M12 S12"  />
	   </layoutData>   
   </HBox>  
   
     <Input  class="sapAlignRight" id="_Z2IC_A_119_LIQ_VALSANOTRA_input"  maxLength="17" value="{path:'Z2ICModel>/A_119_LIQ_VALSANOTRA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{OTRASANVisible>/visible}" change="onChange" tooltip="{i18n>Z2IC.A_119_LIQ_VALSANOTRA}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>
   
      <Input  class="sapAlignRight" id="_Z2IC_A_119_LIQ_VALSANOTRA_inputLIQ" value="{path:'Z2ICModel>/A_119_LIQ_VALSANOTRA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_119_LIQ_VALSANOTRA}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input> 

   <Label text="{i18n>Z2IC.VA_70_VALOR_SANCIONES}" id="A_70_VALOR_SANCIONES">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   
       <Input  class="sapAlignRight" id="_Z2IC_A_70_VALOR_SANCIONES_input"  maxLength="17" value="{path:'Z2ICModel>/A_70_VALOR_SANCIONES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_70_VALOR_SANCIONES}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>
   
     <Input  class="sapAlignRight" id="_Z2IC_A_123_LIQ_VALOR_SANCIONES_input" value="{path:'Z2ICModel>/A_123_LIQ_VALOR_SANCIONES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_70_VALOR_SANCIONES}">
   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>
   </Input>
   
   

   <Label text="{i18n>Z2IC.VA_040_MENOSSALAFAVOR}" id="A_040_MENOSSALAFAVOR">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_040_MENOSSALAFAVOR_input"  maxLength="17" value="{path:'Z2ICModel>/A_040_MENOSSALAFAVOR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_040_MENOSSALAFAVOR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_040_MENOSSALAFAVOR_inputLIQ" value="{path:'Z2ICModel>/A_040_MENOSSALAFAVOR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_040_MENOSSALAFAVOR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
   <Label text="{i18n>Z2IC.VA_041_TOSALGOACARGO}" id="A_041_TOSALGOACARGO">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_041_TOSALGOACARGO_input"  maxLength="17" value="{path:'Z2ICModel>/A_041_TOSALGOACARGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_041_TOSALGOACARGO}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_111_LIQ_TOSALGOACARGO_input" value="{path:'Z2ICModel>/A_111_LIQ_TOSALGOACARGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_041_TOSALGOACARGO}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>   
       
   <Label text="{i18n>Z2IC.VA_042_TOSALGOAFAVOR}" id="A_042_TOSALGOAFAVOR">
       <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_042_TOSALGOAFAVOR_input" maxLength="17" value="{path:'Z2ICModel>/A_042_TOSALGOAFAVOR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_042_TOSALGOAFAVOR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_112_LIQ_TOSALGOAFAVOR_input" value="{path:'Z2ICModel>/A_112_LIQ_TOSALGOAFAVOR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_042_TOSALGOAFAVOR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"  />
	   </layoutData>   
   </Input>
    
   </l:Grid>
   </Panel>
 
 <Panel expandable="true" expanded="true" headerText="E. PAGO" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
       <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion"  vSpacing="0">	
    
          <Label text="{i18n>DESC}" class="sapUmcMLabelBold">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>   
   
   <Label text="{i18n>Z2IC.VA_043_VALORAPAGAR}" id="A_043_VALORAPAGAR">
       <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_043_VALORAPAGAR_input"   maxLength="17" value="{path:'Z2ICModel>/A_043_VALORAPAGAR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_043_VALORAPAGAR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_134_LIQ_VALORAPAGAR_input" value="{path:'Z2ICModel>/A_134_LIQ_VALORAPAGAR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_043_VALORAPAGAR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   
   <!--  
   <Label text="{i18n>Z2IC.VA_044_DESCPAGO}" id="A_044_DESCPAGO">
       <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_044_DESCPAGO_input" value="{path:'Z2ICModel>/A_044_DESCPAGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_044_DESCPAGO_inputLIQ" value="{path:'Z2ICModel>/A_044_DESCPAGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input> 
   -->  
   <Label text="{i18n>Z2IC.VA_045_INTERESESMORA}" id="A_045_INTERESESMORA">
       <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_045_INTERESESMORA_input"  maxLength="17" value="{path:'Z2ICModel>/A_045_INTERESESMORA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_045_INTERESESMORA}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_113_LIQ_INTERESESMORA_input" value="{path:'Z2ICModel>/A_113_LIQ_INTERESESMORA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_045_INTERESESMORA}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   
   </Input>   
   
   <Label text="{i18n>Z2IC.VA_046_TOTALAPAGAR}" id="A_046_TOTALAPAGAR">
       <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input   class="sapAlignRight" id="_Z2IC_A_046_TOTALAPAGAR_input"  maxLength="17" value="{path:'Z2ICModel>/A_046_TOTALAPAGAR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange" tooltip="{i18n>Z2IC.A_046_TOTALAPAGAR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   	
	</Input>
   <Input   class="sapAlignRight" id="_Z2IC_A_114_LIQ_TOTALAPAGAR_input" value="{path:'Z2ICModel>/A_114_LIQ_TOTALAPAGAR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange" tooltip="{i18n>Z2IC.A_046_TOTALAPAGAR}">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>   	
	</Input>	
	</l:Grid>
   </Panel>
   <!--  
   <Panel expandable="true" expanded="true" headerText="{i18n>Z2IC.VSECPAGVOL}" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
    
    <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion"  vSpacing="0">	
    
          <Label text="{i18n>DESC}" class="sapUmcMLabelBold">
    	   <layoutData>
		<l:GridData span="L8 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>
      <Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
    	   <layoutData >
		<l:GridData span="L2 M12 S12" />
	   </layoutData>     
   </Label>   
   
   <Label text="{i18n>Z2IC.VA_047_LIQUIPAGOVOL}" id="A_047_LIQUIPAGOVOL">
          <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_047_LIQUIPAGOVOL_input" value="{path:'Z2ICModel>/A_047_LIQUIPAGOVOL', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>
   <Input  class="sapAlignRight" id="_Z2IC_A_047_LIQUIPAGOVOL_inputLIQ" value="{path:'Z2ICModel>/A_047_LIQUIPAGOVOL', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>
   <Label text="{i18n>Z2IC.VA_048_TOPAGOVOL}" id="A_048_TOPAGOVOL">
          <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input   class="sapAlignRight" id="_Z2IC_A_048_TOPAGOVOL_input" value="{path:'Z2ICModel>/A_048_TOPAGOVOL', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="{EnabledModel>/Enabled}" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>
    <Input   class="sapAlignRight" id="_Z2IC_A_115_LIQ_TOPAGOVOL_input" value="{path:'Z2ICModel>/A_115_LIQ_TOPAGOVOL', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}" enabled="false" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>  
   <Label text="{i18n>Z2IC.VA_049_DESTINOAPORTEVOL}" id="A_049_DESTINOAPORTEVOL">
          <layoutData>
		<l:GridData span="L8 M12 S12" linebreak="true"/>
	   </layoutData>  
   </Label>
   <Input  class="sapAlignRight" id="_Z2IC_A_049_DESTINOAPORTEVOL_input" value="{Z2ICModel>/A_049_DESTINOAPORTEVOL}" enabled="{EnabledModel>/Enabled}" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>
      <Input  class="sapAlignRight" id="_Z2IC_A_049_DESTINOAPORTEVOL_inputLIQ" value="{Z2ICModel>/A_049_DESTINOAPORTEVOL}" enabled="false" change="onChange">
     	   <layoutData>
		<l:GridData span="L2 M12 S12"   />
	   </layoutData>  
   </Input>
   </l:Grid>
   </Panel>
    -->
   <Panel expandable="true" expanded="true" headerText="F. FIRMAS" width="auto" class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton" >
   
   <l:Grid defaultSpan="L1 M12 S12" class="sapDireccion"  vSpacing="0">	
    
    <HBox alignItems="Center">
   <Label text="{i18n>Z2IC.VA_088_FIRMA_DECLARANTE}" id="A_088_FIRMA_DECLARANTE" class="sap08leter sapAlignSelfCenter"/>
   <CheckBox id="_Z2IC_A_088_FIRMA_DECLARANTE_input" value="{Z2ICModel>/A_088_FIRMA_DECLARANTE}" enabled="false" select="onSelectFirmaDeclarante"/>
     <layoutData>
		<l:GridData span="L5 M6 S6"  />
	 </layoutData>  	
	</HBox>

    <HBox class="sapAlignSelfCenter" alignItems="Center">
    
   <Label text="{i18n>Z2IC.VA_094_FIRMA_CONTADOR}" id="A_094_FIRMA_CONTADOR" class="sap08leter sapAlignSelfCenter"/>
   <CheckBox  id="_Z2IC_A_094_FIRMA_CONTADOR_input" value="{Z2ICModel>/A_094_FIRMA_CONTADOR}" enabled="{EnabledModel>/Enabled}" change="onChange" select="onSelectSegundaFirma"/>
   <Label text="{i18n>Z2IC.VA_095_REVISOR_FISCAL}" id="A_095_REVISOR_FISCAL" class="sap08leter"/>
   <CheckBox  id="_Z2IC_A_095_REVISOR_FISCAL_input" value="{Z2ICModel>/A_095_REVISOR_FISCAL}" enabled="{EnabledModel>/Enabled}" change="onChange" select="onSelectSegundaFirma"/>
     <layoutData>
		<l:GridData span="L5 M6 S6"  moveForward="L1 M0 S0" />
	 </layoutData>        
    </HBox>
    
    
        <HBox alignItems="Center">
 		<Label text="{i18n>Z2IC.VA_089_NOMBRE_DECLARANTE}" id="A_089_NOMBRE_DECLARANTE" class="sap08leter"/>
   		<Input id="_Z2IC_A_089_NOMBRE_DECLARANTE_input" value="{Z2ICModel>/A_089_NOMBRE_DECLARANTE}" enabled="{FIRMADECLVisible>/visible}" change="onChange" width="187%" liveChange = "onLiveChangeUpper"/>
      	<layoutData>
			<l:GridData span="L5 M6 S6" linebreak="true"  />
	 	</layoutData> 
	 	             
        </HBox>
        
        <HBox alignItems="Center">
           <Label text="{i18n>Z2IC.VA_096_NOMBRE_CONT_FISC}" id="A_096_NOMBRE_CONT_FISC" class="sap08leter"/>
  		   <Input id="_Z2IC_A_096_NOMBRE_CONT_FISC_input" value="{Z2ICModel>/A_096_NOMBRE_CONT_FISC}" enabled="{SEGFIRMAVisible>/visible}" change="onChange" width="210%"  liveChange = "onLiveChangeUpper"/>
        <layoutData>
			<l:GridData span="L5 M6 S6"   moveForward="L1 M0 S0"/>
	 	</layoutData> 
        </HBox>
        
        <HBox alignItems="Center"> 
          <Label text="C.C" id="A_090_CC_DECLARANTE" class="sap08leter"/>
   <CheckBox id="_Z2IC_A_090_CC_DECLARANTE_input" value="{Z2ICModel>/A_090_CC_DECLARANTE}" enabled="{FIRMADECLVisible>/visible}" change="onChange" select="onSelectIdFirmaDec"/>
   <Label text="C.E" id="A_091_CE_DECLARANTE" class="sap08leter"/>
   <CheckBox id="_Z2IC_A_091_CE_DECLARANTE_input" value="{Z2ICModel>/A_091_CE_DECLARANTE}" enabled="{FIRMADECLVisible>/visible}" change="onChange" select="onSelectIdFirmaDec"/>
   <Label text="T.I" id="A_092_TI_DECLARANTE" class="sap08leter"/>
   <CheckBox id="_Z2IC_A_092_TI_DECLARANTE_input" value="{Z2ICModel>/A_092_TI_DECLARANTE}" enabled="{FIRMADECLVisible>/visible}" change="onChange" select="onSelectIdFirmaDec"/>
   <Label text="No." id="A_093_NUMERO_DECLARANTE" class="sap08leter"/>
   <Input id="_Z2IC_A_093_NUMERO_DECLARANTE_input" value="{Z2ICModel>/A_093_NUMERO_DECLARANTE}" enabled="{FIRMADECLVisible>/visible}" change="onChange" liveChange = "onLiveChangeUpper"/>
            <layoutData>
			<l:GridData span="L5 M6 S6"  linebreak="true"/>
	 	</layoutData>     
        </HBox>
        
             <HBox alignItems="Center"> 
   <Label text="C.C" id="A_097_CC_CONT_FISC" class="sap08leter"/>
   <CheckBox id="_Z2IC_A_097_CC_CONT_FISC_input" value="{Z2ICModel>/A_097_CC_CONT_FISC}" enabled="{SEGFIRMAVisible>/visible}" change="onChange" select="onSelectIdSecFirma"/>
   <Label text="C.E" id="A_098_CE_CONT_FISC" class="sap08leter"/>
   <CheckBox id="_Z2IC_A_098_CE_CONT_FISC_input" value="{Z2ICModel>/A_098_CE_CONT_FISC}" enabled="{SEGFIRMAVisible>/visible}" change="onChange" select="onSelectIdSecFirma"/>
   <Label text="No." id="A_099_NUMERO_CONT_FISC" class="sap08leter"/>
   <Input id="_Z2IC_A_099_NUMERO_CONT_FISC_input" value="{Z2ICModel>/A_099_NUMERO_CONT_FISC}" enabled="{SEGFIRMAVisible>/visible}" change="onChange"  liveChange = "onLiveChangeUpper"/>
   <Label text=" TP:" id="A_101_TARJETA_PROF"/>
   <Input id="_Z2IC_A_101_TARJETA_PROF_input" value="{Z2ICModel>/A_101_TARJETA_PROF}" enabled="{SEGFIRMAVisible>/visible}" change="onChange"  liveChange = "onLiveChangeUpper"/>
          <layoutData>
			<l:GridData span="L5 M6 S6"   moveForward="L1 M0 S0"/>
	 	</layoutData>            
             </HBox>
    </l:Grid>
    
    
   </Panel>
   <!-- 
   <Label text="Fecha Maxima de Presentacion" id="A_087_FECHAPRESENTACION"/>
   <DatePicker id="_Z2IC_A_087_FECHAPRESENTACION_date" value="{Z2ICModel>/A_087_FECHAPRESENTACION}" enabled="{EnabledModel>/Enabled}" displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange"/>
   <Label text="ANUAL" id="A_100_ANUAL"/>
   <Input id="_Z2IC_A_100_ANUAL_input" value="{Z2ICModel>/A_100_ANUAL}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
	   <Label text="Fecha Creacion Declaracion" id="A_129_FECHA_CREACION"/>
   <DatePicker id="_Z2IC_A_129_FECHA_CREACION_date" value="{Z2ICModel>/A_129_FECHA_CREACION}" enabled="{EnabledModel>/Enabled}" displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange"/>
   <Label text="Fecha Presentacion Banco" id="A_130_FECHA_PRESENTACION"/>
   <DatePicker id="_Z2IC_A_130_FECHA_PRESENTACION_date" value="{Z2ICModel>/A_130_FECHA_PRESENTACION}" enabled="{EnabledModel>/Enabled}" displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange"/>
   <Label text="Existen Diferencias" id="A_131_EXISTE_VAL_DIF"/>
   <Input id="_Z2IC_A_131_EXISTE_VAL_DIF_input" value="{Z2ICModel>/A_131_EXISTE_VAL_DIF}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
	
		 <Label text="Aumenta Saldo a Favor" id="A_135_AUMENTO_SALDO_FAVOR"/>
   <Input id="_Z2IC_A_135_AUMENTO_SALDO_FAVOR_input" value="{Z2ICModel>/A_135_AUMENTO_SALDO_FAVOR}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
		   <Label text="Interes ICA Digitado" id="A_136_INTERES_ICA"/>
   <Input id="_Z2IC_A_136_INTERES_ICA_input" value="{Z2ICModel>/A_136_INTERES_ICA}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
   <Label text="Interes Avisos y Tableros Digi" id="A_137_INTERES_AYT"/>
   <Input id="_Z2IC_A_137_INTERES_AYT_input" value="{Z2ICModel>/A_137_INTERES_AYT}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
   <Label text="Interes Pago Unidades Digitado" id="A_138_INTERES_PAGO_UNIDADES"/>
   <Input id="_Z2IC_A_138_INTERES_PAGO_UNIDADES_input" value="{Z2ICModel>/A_138_INTERES_PAGO_UNIDADES}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
   <Label text="Liquidado Interes ICA" id="A_139_LIQ_INTERES_ICA"/>
   <Input id="_Z2IC_A_139_LIQ_INTERES_ICA_input" value="{Z2ICModel>/A_139_LIQ_INTERES_ICA}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
   <Label text="Liquidado Interes AYT" id="A_140_LIQ_INTERES_AYT"/>
   <Input id="_Z2IC_A_140_LIQ_INTERES_AYT_input" value="{Z2ICModel>/A_140_LIQ_INTERES_AYT}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
   <Label text="Liquidado Interes Pago Unidade" id="A_141_LIQ_INTERES_PAGO_UNI"/>
   <Input id="_Z2IC_A_141_LIQ_INTERES_PAGO_UNI_input" value="{Z2ICModel>/A_141_LIQ_INTERES_PAGO_UNI}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
     <Label text="Base Interes ICA" id="A_142_DIG_BASE_INTERES_ICA"/>
   <Input id="_Z2IC_A_142_DIG_BASE_INTERES_ICA_input" value="{Z2ICModel>/A_142_DIG_BASE_INTERES_ICA}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
   <Label text="Base Interes Avisos y Tableros" id="A_143_DIG_BASE_INTERES_AYT"/>
   <Input id="_Z2IC_A_143_DIG_BASE_INTERES_AYT_input" value="{Z2ICModel>/A_143_DIG_BASE_INTERES_AYT}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
   <Label text="Base Interes Pago Unidades Com" id="A_144_DIG_BASE_INTERES_PU"/>
   <Input id="_Z2IC_A_144_DIG_BASE_INTERES_PU_input" value="{Z2ICModel>/A_144_DIG_BASE_INTERES_PU}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
		
		 -->		


  <!-- </f:SimpleForm> -->
  	 </ScrollContainer>

</core:FragmentDefinition>