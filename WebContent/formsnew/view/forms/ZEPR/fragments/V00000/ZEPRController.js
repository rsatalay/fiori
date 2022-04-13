<core:FragmentDefinition xmlns="sap.m"
	xmlns:l="sap.ui.layout" xmlns:f="sap.ui.layout.form"
	xmlns:core="sap.ui.core">

		<!-- <Toolbar> <ToolbarSpacer/> <ToolbarSpacer/> <Button text="{i18n>EXCEL.UPLOAD}" 
			press="handleUploadPress" enabled="true" icon="sap-icon://upload" tooltip="{i18n>EXCEL.UPLOAD}"/> 
			<Button text="{i18n>EXPORT.PDF}" press="handlePdfPress" enabled="true" icon="sap-icon://pdf-attachment" 
			tooltip="{i18n>EXPORT.PDF}"/> </Toolbar> -->
		<ScrollContainer height="100%" vertical="true"
			horizontal="true" class="sapUmcConsumptionSegmentedButton">
			<!-- <f:SimpleForm title="" minWidth="1024" maxContainerCols="2" editable="true" 
				layout="ResponsiveGridLayout" labelSpanL="3" labelSpanM="3" emptySpanL="4" 
				emptySpanM="4" columnsL="1" columnsM="1"> -->

			<Panel expandable="true" expanded="true"
				headerText="{i18n>ZEPR.INFOFORM}" width="auto"
				class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton">
				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" >
					<Hbox alignItems="Center">

						<Label text="{i18n>ZEPR.A_33_PERIODO}" id="A_33_PERIODO" />
						<ComboBox selectedKey="{ZEPRModel>/A_33_PERIODO}" 
							enabled="{EnabledModel>/Enabled}" width="100%" change="onChangePeriodo"
							tooltip="{i18n>ZEPR.TTA_33_PERIODO}" class="sapDireccion"
							id="_ZEPR_A_33_PERIODO_input" items="{Periodo>/results}">
							<core:Item key="{Periodo>Number}"
								text="{Periodo>Number}" class="letraDireccion" />

						</ComboBox>


						<layoutData class="sapUiSmallMargins">
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Hbox>

					<Hbox alignItems="Center">

						<Label text="{i18n>ZEPR.A_34_ANO}" id="A_34_ANO" />

						<Input id="_ZEPR_A_34_ANO_input" tooltip="{i18n>ZEPR.TTA_34_ANO}"
							value="{ZEPRModel>/A_34_ANO}" enabled="{EnabledModel>/Enabled}"
							maxLength="4" change="onChangePeriodo" />
						<layoutData class="sapUiSmallMargins">
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Hbox>


					<Label text="">
						<layoutData class="sapUiSmallMargins">
							<l:GridData span="L4 M12 S12" />
						</layoutData>
					</Label>


					<Hbox alignItems="Center">
						<Label text="{i18n>ZEPR.A_36_FECHA_PRESENTACION}"
							id="A_60_FECHA_MAX_PRESTENCION" />
						<DatePicker id="_ZEPR_A_60_FECHA_MAX_PRESTENCION_date"
							value="{ZEPRModel>/A_60_FECHA_MAX_PRESTENCION}" enabled="false"
							displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd"
							change="onChange" />
						<layoutData class="sapUiSmallMargins">
							<l:GridData span="L4 M12 S12" />
						</layoutData>
					</Hbox>

<!-- 
					<VBox>
						<Label text="{i18n>ZEPR.A_53_NO_RESOLUCION}"
							id="A_53_NO_RESOLUCION" />
						<Input id="_ZEPR_A_53_NO_RESOLUCION_input"
							value="{ZEPRModel>/A_53_NO_RESOLUCION}"
							enabled="{EnabledModel>/Enabled}" change="onChange" />
						<layoutData>
							<l:GridData span="L2 M2 S2" />
						</layoutData>
					</VBox>
					<VBox>
						<Label text="{i18n>ZEPR.A_54_FECHA_RESOLUCION}"
							id="A_54_FECHA_RESOLUCION" />
						<DatePicker id="_ZEPR_A_54_FECHA_RESOLUCION_date"
							value="{ZEPRModel>/A_54_FECHA_RESOLUCION}"
							enabled="{EnabledModel>/Enabled}" displayFormat="dd.MM.yyyy"
							valueFormat="yyyyMMdd" change="onChange" />
						<layoutData>
							<l:GridData span="L2 M2 S2" />
						</layoutData>
					</VBox>
 -->
				</l:Grid>
			</Panel>


			<Panel expandable="true" expanded="true"
				headerText="A. DATOS GENERALES" width="auto"
				class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton">
				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" vSpacing="0">


					<!-- APELLIDO Y NOMBRES O RAZON SOCIAL -->
					<VBox>
						<Label text="{i18n>ZEPR.A_00_PRO_O_RAZON_SOCIAL_ZEPR}"
							class="sapUmcMLabelBold" id="A_00_PRO_O_RAZON_SOCIAL_ZEPR" />
						<Input id="_ZEPR_A_00_PRO_O_RAZON_SOCIAL_ZEPR_input"
							value="{ZEPRModel>/A_00_PRO_O_RAZON_SOCIAL_ZEPR}" enabled="false"
							change="onChange" />
						<layoutData>
							<l:GridData span="L5 M2 S2" />
						</layoutData>
					</VBox>
					<VBox>
						<Label text="{i18n>ZEPR.A_01_NUM_IDENTIDAD_ZEPR}"
							id="A_01_NUM_IDENTIDAD_ZEPR" class="sapUmcMLabelBold" />

						<HBox alignItems="Center">
							<Label text="CC" id="A_02_CC_ZEPR" />
							<CheckBox id="_ZEPR_A_02_CC_ZEPR_input" tooltip="{i18n>ZEPR.TTID}"
								value="{ZEPRModel>/A_02_CC_ZEPR}" enabled="false"
								change="onChange" />
							<Label text="NIT" id="A_03_NIT_ZEPR" />
							<CheckBox id="_ZEPR_A_03_NIT_ZEPR_input" tooltip="{i18n>ZEPR.TTID}"
								value="{ZEPRModel>/A_03_NIT_ZEPR}" enabled="false"
								change="onChange" />
							<Label text="TI" id="A_04_TI_ZEPR" />
							<CheckBox id="_ZEPR_A_04_TI_ZEPR_input" tooltip="{i18n>ZEPR.TTID}"
								value="{ZEPRModel>/A_04_TI_ZEPR}" enabled="false"
								change="onChange" />
							<Label text="CE" id="A_05_CE_ZEPR" />
							<CheckBox id="_ZEPR_A_05_CE_ZEPR_input" tooltip="{i18n>ZEPR.TTID}"
								value="{ZEPRModel>/A_05_CE_ZEPR}" enabled="false"
								change="onChange" />
							<Label text="No." />
							<Input id="_ZEPR_A_01_NUM_IDENTIDAD_ZEPR_input" tooltip="{i18n>ZEPR.TTID}"
								value="{ZEPRModel>/A_01_NUM_IDENTIDAD_ZEPR}" enabled="false"
								change="onChange" />
							<Label text="DV" id="A_06_DV_ZEPR" />
							<Input id="_ZEPR_A_06_DV_ZEPR_input" tooltip="{i18n>ZEPR.TTID}"
								value="{ZEPRModel>/A_06_DV_ZEPR}" enabled="false"
								change="onChange" width="30%" />
						</HBox>
						<layoutData>
							<l:GridData span="L7 M2 S2" />
						</layoutData>
					</VBox>


					<VBox>
						<Label text="{i18n>ZEPR.A_07_DIR_AGENTE_RETENEDOR}"
							class="sapUmcMLabelBold" id="A_07_DIR_AGENTE_RETENEDOR" />
						<Input id="_ZEPR_A_07_DIR_AGENTE_RETENEDOR_input" 
							value="{ZEPRModel>/A_07_DIR_AGENTE_RETENEDOR}" enabled="false"
							change="onChange"  tooltip="{i18n>ZEPR.TTDIR}" />
						<layoutData>
							<l:GridData span="L4 M12 S12" />
						</layoutData>
					</VBox>


					<VBox alignItems="Center">
						<Label text="{i18n>ZEPR.A_08_SOL_ACTUALIZAR_DIR_AG}"
							id="A_08_SOL_ACTUALIZAR_DIR_AG" />
						<Checkbox id="_ZEPR_A_08_SOL_ACTUALIZAR_DIR_AG_input"
							value="{ZEPRModel>/A_08_SOL_ACTUALIZAR_DIR_AG}"
							enabled="{EnabledModel>/Enabled}" select="onChangeNewAdress" />
						<layoutData>
							<l:GridData span="L1 M12 S12" />
						</layoutData>
					</VBox>


					<VBox>
						<Label text="{i18n>ZEPR.A_09_DIRECCION_NOTIFICACION}"
							class="sapUmcMLabelBold" id="A_09_DIRECCION_NOTIFICACION" />
						<Input id="_ZEPR_A_09_DIRECCION_NOTIFICACION_input"  tooltip="{i18n>ZEPR.TTDIR}"
							value="{ZEPRModel>/A_09_DIRECCION_NOTIFICACION}" enabled="false"
							change="onChange" />
						<layoutData>
							<l:GridData span="L4 M12 S12" />
						</layoutData>

					</VBox>

					<VBox alignItems="Center">
						<Label text="{i18n>ZEPR.A_08_SOL_ACTUALIZAR_DIR_AG}"
							id="A_10_SOL_ACTUALIZAR_DIR_NT" />
						<Checkbox id="_ZEPR_A_10_SOL_ACTUALIZAR_DIR_NT_input"
							select="onChangeNewAdress"
							value="{ZEPRModel>/A_10_SOL_ACTUALIZAR_DIR_NT}"
							enabled="{EnabledModel>/Enabled}" change="onChange" />
						<layoutData>
							<l:GridData span="L1 M12 S12" />
						</layoutData>
					</VBox>

					<VBox>
						<Label text="{i18n>ZEPR.A_11_TELEFONO}" id="A_11_TELEFONO"
							class="sapUmcMLabelBold" />
						<Input id="_ZEPR_A_11_TELEFONO_input"   tooltip="{i18n>ZEPR.TTA_11_TELEFONO}"
							value="{ZEPRModel>/A_11_TELEFONO}" enabled="false"
							change="onChange" />
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</VBox>
				</l:Grid>
				<!-- INICIO MODIFICAION DE DIRECCION AGENTE RETENEDOR -->

				<Panel expandable="true" expanded="true"
					headerText="{i18n>ZDIR.TITULODIR}"
					width="auto"
					class="sapUiResponsiveMargin sapUmcWhiteBackgroundColor "
					visible="{DIRVisible2>/visible}">

					<l:Grid defaultSpan="L1 M4 S6"
						class="sapUiSmallMargin sapDireccion" vSpacing="0" hSpacing="0.1">
						<l:content>
						
							<Text text="{i18n>ZDIR.AYUDA}" style="H2">
						<layoutData>
							<l:GridData span="L12 M12 S12" />
						</layoutData>
						</Text>
						
							<Title text="{i18n>ZDIR.VIAPRINC}" style="H2"
								visible="{DIRVisible>/visible}"
								class=" sapUmcMLabelBold  sapDireccion ">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>

							<VBox>
								<Label text="{i18n>ZDIR.VIA}" id="A_01_VIAZEPR1"
									visible="{VIAVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_01_VIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class="sapDireccion"
									visible="{VIAVisible>/visible}" id="_ZDIR_A_01_VIA_inputZEPR1"
									items="{Via>/results}">
									<core:Item key="{Via>Via}" text="{Via>Descripcion}"
										class="letraDireccion" />

								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>

							<VBox>
								<Label text="{i18n>ZDIR.NUMVIA}" id="A_02_NUMVIAZEPR1"
									width="100%" class="sapDireccion"
									visible="{DIRVisible>/visible}">
								</Label>

								<MaskInput mask="999"
									id="_ZDIR_A_02_NUMVIA_inputZEPR1" width="100%"
									value="{ZDIRModel>/A_02_NUMVIA}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion"
									class="sapDireccion" visible="{DIRVisible>/visible}">
								</MaskInput>
							</VBox>
							<VBox>
								<Label text="Letra" id="A_03_LETRAVIAZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_03_LETRAVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class="sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_03_LETRAVIA_inputZEPR1" items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>

							</VBox>
							<VBox>
								<Label text="Numero Sec." id="A_04_NUMSECVIAZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<MaskInput mask="99"
									id="_ZDIR_A_04_NUMSECVIA_inputZEPR1"
									visible="{DIRVisible>/visible}" width="100%"
									value="{ZDIRModel>/A_04_NUMSECVIA}" class="sapDireccion"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion" />


							</VBox>
							<VBox>
								<Label text="Letra Sec" id="A_05_LETRASECVIAZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_05_LETRASECVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class="sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_05_LETRASECVIA_inputZEPR1"
									items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>
							</VBox>
							<VBox>
								<Label text="Bis" id="A_06_BISVIAZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_06_BISVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class="sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_06_BISVIA_inputZEPR1" items="{Bis>/results}">
									<core:Item key="{Bis>Letra}" text="{Bis>Descripcion}"
										class="sapDireccion" />
								</ComboBox>

							</VBox>


							<VBox>
								<Label text="Sector" id="A_07_SECTORVIAZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_07_SECTORVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class=" sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_07_SECTORVIA_inputZEPR1" items="{Sector2>/results}">
									<core:Item key="{Sector2>Letra}"
										text="{Sector2>Descripcion}" />
								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>


							<Title text="Placa" style="H2"
								visible="{DIRVisible>/visible}"
								class=" sapUmcMLabelBold sapDireccion">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>
							<VBox>
								<Label text="Cruce" id="A_08_CRUCEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_08_CRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class=" sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_08_CRUCE_inputZEPR1" items="{Via>/results}">
									<core:Item key="{Via>Via}" text="{Via>Descripcion}" />

								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>
							<VBox>
								<Label text="Numero Cruce" id="A_09_NUMCRUCEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />




								<MaskInput mask="999"
									id="_ZDIR_A_09_NUMCRUCE_inputZEPR1"
									visible="{DIRVisible>/visible}" width="100%"
									value="{ZDIRModel>/A_09_NUMCRUCE}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion"
									class="sapDireccion" />

							</VBox>

							<VBox>
								<Label text="Letra Cruce" id="A_10_LETRACRUCEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_10_LETRACRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class=" sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_10_LETRACRUCE_inputZEPR1"
									items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>
							</VBox>

							<VBox>
								<Label text="Numero Sec Cruce" id="A_11_NUMSECCRUCEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<MaskInput mask="99"
									id="_ZDIR_A_11_NUMSECCRUCE_inputZEPR1"
									visible="{DIRVisible>/visible}" width="100%"
									value="{ZDIRModel>/A_11_NUMSECCRUCE}" class="sapDireccion"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion" />
							</VBox>

							<VBox>
								<Label text="Letra Sec Cruce" id="A_12_LETRASECCRUCEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_12_LETRASECCRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class=" sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_12_LETRASECCRUCE_inputZEPR1"
									items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>
							</VBox>

							<VBox>
								<Label text="Bis" id="A_13_BISCRUCEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_13_BISCRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class=" sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_13_BISCRUCE_inputZEPR1" items="{Bis>/results}">
									<core:Item key="{Bis>Letra}" text="{Bis>Descripcion}" />
								</ComboBox>
							</VBox>
							<VBox>
								<Label text="Sector" id="A_14_SECTORCRUCEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_14_SECTORCRUCE}"
									width="100%" change="onChangeDireccion"
									enabled="{EnabledModel>/Enabled}" class=" sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_14_SECTORCRUCE_inputZEPR1"
									items="{Sector2>/results}">
									<core:Item key="{Sector2>Letra}"
										text="{Sector2>Descripcion}" />

								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>
							<VBox>
								<Label text="{i18n>ZDIR.UDP}"
									id="A_15_ULTDIGPLACAZEPR1" visible="{DIRVisible>/visible}"
									class="sapDireccion" />
								<MaskInput mask="999"
									id="_ZDIR_A_15_ULTDIGPLACA_inputZEPR1"
									visible="{DIRVisible>/visible}"
									value="{ZDIRModel>/A_15_ULTDIGPLACA}" class="sapDireccion"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion" />
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>

							<Title text="Interior" style="H2"
								visible="{DIRVisible>/visible}"
								class=" sapUmcMLabelBold  sapDireccion">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>
							<VBox>
								<Label text="Bloque" id="A_16_BLOQUEZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<MaskInput  mask = "~~~"  id="_ZDIR_A_16_BLOQUE_inputZEPR1"
									visible="{DIRVisible>/visible}" width="100%"
									value="{ZDIRModel>/A_16_BLOQUE}"
									enabled="{EnabledModel>/Enabled}" class="sapDireccion"
									change="onChangeDireccion" maxLength="3" >
																		<rules>
						<MaskInputRule maskFormatSymbol="~" regex="[^_]"/>
					</rules>
				</MaskInput>
							</VBox>
							<VBox>
								<Label text="Piso" id="A_17_PISOZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<MaskInput  mask = "99"  id="_ZDIR_A_17_PISO_inputZEPR1"
									visible="{DIRVisible>/visible}" width="100%"
									class="sapDireccion" value="{ZDIRModel>/A_17_PISO}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion"
									maxLength="2" />
							</VBox>
							<VBox>
								<Label text="Unidad" id="A_18_UNIDADZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<MaskInput mask="99" id="_ZDIR_A_18_UNIDAD_inputZEPR1"
									visible="{DIRVisible>/visible}" width="100%"
									value="{ZDIRModel>/A_18_UNIDAD}"
									enabled="{EnabledModel>/Enabled}" class="sapDireccion"
									change="onChangeDireccion" />
							</VBox>

							<VBox>
								<Label text="Tipo Unidad" id="A_19_DESUNIDADZEPR1"
									visible="{DIRVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_19_DESUNIDAD}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" class=" sapDireccion"
									visible="{DIRVisible>/visible}"
									id="_ZDIR_A_19_DESUNIDAD_inputZEPR1" items="{Unidad>/results}">
									<core:Item key="{Unidad>Letra}"
										text="{Unidad>Descripcion}" />
								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>

							</VBox>

							<VBox>
								<Label text="Via Rural" id="A_26_DIRNUMRURZEPR1"
									visible="{RURALVisible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel>/A_26_DIRNUMRUR}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion" value="{ZDIRModel>/A_26_DIRNUMRUR}"
									class=" sapDireccion" visible="{RURALVisible>/visible}"
									id="_ZDIR_A_26_DIRNUMRUR_inputZEPR1"
									items="{ViaRural>/results}">
									<core:Item key="{ViaRural>Viarural}"
										text="{ViaRural>Descripcion}" class="letraDireccion" />
								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>
							<VBox>
								<Label text="Direccion Rural" id="A_25_DIRRURAZEPR1"
									visible="{RURALVisible>/visible}" class="sapDireccion" />
								<Input id="_ZDIR_A_25_DIRRURAL_inputZEPR1"
									visible="{RURALVisible>/visible}" class="sapDireccion"
									value="{ZDIRModel>/A_25_DIRRURAL}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion">

								</Input>
								<layoutData>
									<l:GridData span="L8 M12 S12" />
								</layoutData>
							</VBox>


							<Title text="{i18n>ZDIR.NDIR}" style="H2"
								visible="{VIAVisible>/visible}" 
								class="sapUmcMLabelBold  sapDireccion">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>

							<Button text="{i18n>ZDIR.VDIR}"
								enabled="{EnabledModel>/Enabled}" press="onShowAdress"
								visible="{VIAVisible>/visible}" id="VerifyButAgen"
								class="sapUiSmallMarginBottom">
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</Button>

							<Button text="{i18n>ZDIR.BDIR}"
								enabled="{EnabledModel>/Enabled}" id="EraseButAgen"
								press="onEraseAdress" visible="{VIAVisible>/visible}"
								class="sapUiSmallMarginBottom">
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</Button>

							<VBox>
								<Title text="{i18n>ZDIR.DIRAGERET}" style="H2"
									visible="{DIRVisible>/visible}"
									class="sapUmcMLabelBold  sapDireccion">
								</Title>
								<Input id="_ZDIR_A_24_DIRECCIONCORREGIDA_inputZEPR1"
									visible="{VIAVisible>/visible}" change="onChangeDireccion" value="{ZDIRModel>/A_29_DIRPANTALLA}"
									enabled="false">

								</Input>
								<layoutData>
									<l:GridData span="L7 M12 S12" />
								</layoutData>
							</VBox>


						</l:content>
					</l:Grid>
				</Panel>

				<!-- FIN MODIFICACION DE DIRECCION AGENTE RETENEDOR -->

				<!-- INICIO MODIFICAION DE DIRECCION NOTIFICACION -->

				<Panel expandable="true" expanded="true"
					headerText= "{i18n>ZDIR.DIGDIRNOT}"
					width="auto"
					class="sapUiResponsiveMargin sapUmcWhiteBackgroundColor "
					visible="{DIR2Visible2>/visible}">

					<l:Grid defaultSpan="L1 M4 S6"
						class="sapUiSmallMargin sapDireccion" vSpacing="0" hSpacing="0.1">
						<l:content>
						
						<Text text="{i18n>ZDIR.AYUDA}" style="H2">
						<layoutData>
							<l:GridData span="L12 M12 S12" />
						</layoutData>
						</Text>
						
						

							<Title text="{i18n>ZDIR.VIAPRINC}" style="H2"
								visible="{DIR2Visible>/visible}"
								class=" sapUmcMLabelBold  sapDireccion ">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>

							<VBox>
								<Label text="{i18n>ZDIR.VIA}" id="A_01_VIAZEPR2"
									visible="{VIA2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_01_VIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class="sapDireccion"
									visible="{VIA2Visible>/visible}" id="_ZDIR_A_01_VIA_inputZEPR2"
									items="{Via>/results}">
									<core:Item key="{Via>Via}" text="{Via>Descripcion}"
										class="letraDireccion" />

								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>

							<VBox>
								<Label text="{i18n>ZDIR.NUMVIA}" id="A_02_NUMVIAZEPR2"
									width="100%" class="sapDireccion"
									visible="{DIR2Visible>/visible}">
								</Label>

								<MaskInput mask="999"
									id="_ZDIR_A_02_NUMVIA_inputZEPR2" width="100%"
									value="{ZDIRModel2>/A_02_NUMVIA}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion2"
									class="sapDireccion" visible="{DIR2Visible>/visible}">
								</MaskInput>
							</VBox>
							<VBox>
								<Label text="Letra" id="A_03_LETRAVIAZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_03_LETRAVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class="sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_03_LETRAVIA_inputZEPR2" items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>

							</VBox>
							<VBox>
								<Label text="Numero Sec." id="A_04_NUMSECVIAZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<MaskInput mask="99"
									id="_ZDIR_A_04_NUMSECVIA_inputZEPR2"
									visible="{DIR2Visible>/visible}" width="100%"
									value="{ZDIRModel2>/A_04_NUMSECVIA}" class="sapDireccion"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion2" />


							</VBox>
							<VBox>
								<Label text="Letra Sec" id="A_05_LETRASECVIAZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_05_LETRASECVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class="sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_05_LETRASECVIA_inputZEPR2"
									items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>
							</VBox>
							<VBox>
								<Label text="Bis" id="A_06_BISVIAZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_06_BISVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class="sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_06_BISVIA_inputZEPR2" items="{Bis>/results}">
									<core:Item key="{Bis>Letra}" text="{Bis>Descripcion}"
										class="sapDireccion" />
								</ComboBox>

							</VBox>


							<VBox>
								<Label text="Sector" id="A_07_SECTORVIAZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_07_SECTORVIA}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class=" sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_07_SECTORVIA_inputZEPR2" items="{Sector2>/results}">
									<core:Item key="{Sector2>Letra}"
										text="{Sector2>Descripcion}" />
								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>


							<Title text="Placa" style="H2"
								visible="{DIR2Visible>/visible}"
								class=" sapUmcMLabelBold sapDireccion">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>
							<VBox>
								<Label text="Cruce" id="A_08_CRUCEZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_08_CRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class=" sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_08_CRUCE_inputZEPR2" items="{Via>/results}">
									<core:Item key="{Via>Via}" text="{Via>Descripcion}" />

								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>
							<VBox>
								<Label text="Numero Cruce" id="A_09_NUMCRUCEZEPR2"
									visible="{DIRVisible>/visible}" class="sapDireccion" />




								<MaskInput mask="999"
									id="_ZDIR_A_09_NUMCRUCE_inputZEPR2"
									visible="{DIR2Visible>/visible}" width="100%"
									value="{ZDIRModel2>/A_09_NUMCRUCE}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion2"
									class="sapDireccion" />

							</VBox>

							<VBox>
								<Label text="Letra Cruce" id="A_10_LETRACRUCEZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_10_LETRACRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class=" sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_10_LETRACRUCE_inputZEPR2"
									items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>
							</VBox>

							<VBox>
								<Label text="Numero Sec Cruce" id="A_11_NUMSECCRUCEZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<MaskInput mask="99"
									id="_ZDIR_A_11_NUMSECCRUCE_inputZEPR2"
									visible="{DIR2Visible>/visible}" width="100%"
									value="{ZDIRModel2>/A_11_NUMSECCRUCE}" class="sapDireccion"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion2" />
							</VBox>

							<VBox>
								<Label text="Letra Sec Cruce" id="A_12_LETRASECCRUCEZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox
									selectedKey="{ZDIRModel2>/A_12_LETRASECCRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class=" sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_12_LETRASECCRUCE_inputZEPR2"
									items="{LetraVia>/results}">
									<core:Item key="{LetraVia>Letra}"
										text="{LetraVia>Letra}" />
								</ComboBox>
							</VBox>

							<VBox>
								<Label text="Bis" id="A_13_BISCRUCEZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_13_BISCRUCE}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class=" sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_13_BISCRUCE_inputZEPR2" items="{Bis>/results}">
									<core:Item key="{Bis>Letra}" text="{Bis>Descripcion}" />
								</ComboBox>
							</VBox>
							<VBox>
								<Label text="Sector" id="A_14_SECTORCRUCEZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_14_SECTORCRUCE}"
									width="100%" change="onChangeDireccion2"
									enabled="{EnabledModel>/Enabled}" class=" sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_14_SECTORCRUCE_inputZEPR2"
									items="{Sector2>/results}">
									<core:Item key="{Sector2>Letra}"
										text="{Sector2>Descripcion}" />

								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>
							<VBox>
								<Label text="{i18n>ZDIR.UDP}"
									id="A_15_ULTDIGPLACAZEPR2" visible="{DIR2Visible>/visible}"
									class="sapDireccion" />
								<MaskInput mask="999"
									id="_ZDIR_A_15_ULTDIGPLACA_inputZEPR2"
									visible="{DIR2Visible>/visible}"
									value="{ZDIRModel2>/A_15_ULTDIGPLACA}" class="sapDireccion"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion2" />
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>

							<Title text="Interior" style="H2"
								visible="{DIR2Visible>/visible}"
								class=" sapUmcMLabelBold  sapDireccion">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>
							<VBox>
								<Label text="Bloque" id="A_16_BLOQUEZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
									<MaskInput  mask = "~~~"   id="_ZDIR_A_16_BLOQUE_inputZEPR2"
									visible="{DIR2Visible>/visible}" width="100%"
									value="{ZDIRModel2>/A_16_BLOQUE}"
									enabled="{EnabledModel>/Enabled}" class="sapDireccion"
									change="onChangeDireccion2" maxLength="3" >
																		<rules>
						<MaskInputRule maskFormatSymbol="~" regex="[^_]"/>
					</rules>
				</MaskInput>
							</VBox>
							<VBox>
								<Label text="Piso" id="A_17_PISOZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<MaskInput  mask = "99" id="_ZDIR_A_17_PISO_inputZEPR2"
									visible="{DIR2Visible>/visible}" width="100%"
									class="sapDireccion" value="{ZDIRModel2>/A_17_PISO}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion2"
									maxLength="2" />
							</VBox>
							<VBox>
								<Label text="Unidad" id="A_18_UNIDADZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<MaskInput mask="99" id="_ZDIR_A_18_UNIDAD_inputZEPR2"
									visible="{DIR2Visible>/visible}" width="100%"
									value="{ZDIRModel2>/A_18_UNIDAD}"
									enabled="{EnabledModel>/Enabled}" class="sapDireccion"
									change="onChangeDireccion2" />
							</VBox>

							<VBox>
								<Label text="Tipo Unidad" id="A_19_DESUNIDADZEPR2"
									visible="{DIR2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_19_DESUNIDAD}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2" class=" sapDireccion"
									visible="{DIR2Visible>/visible}"
									id="_ZDIR_A_19_DESUNIDAD_inputZEPR2" items="{Unidad>/results}">
									<core:Item key="{Unidad>Letra}"
										text="{Unidad>Descripcion}" />
								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>

							</VBox>

							<VBox>
								<Label text="Via Rural" id="A_26_DIRNUMRURZEPR2"
									visible="{RURAL2Visible>/visible}" class="sapDireccion" />
								<ComboBox selectedKey="{ZDIRModel2>/A_26_DIRNUMRUR}"
									enabled="{EnabledModel>/Enabled}" width="100%"
									change="onChangeDireccion2"
									value="{ZDIRModel2>/A_26_DIRNUMRUR}" class=" sapDireccion"
									visible="{RURAL2Visible>/visible}"
									id="_ZDIR_A_26_DIRNUMRUR_inputZEPR2"
									items="{ViaRural>/results}">
									<core:Item key="{ViaRural>Viarural}"
										text="{ViaRural>Descripcion}" class="letraDireccion" />
								</ComboBox>
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</VBox>
							<VBox>
								<Label text="Direccion Rural" id="A_25_DIRRURAZEPR2"
									visible="{RURAL2Visible>/visible}" class="sapDireccion" />
								<Input id="_ZDIR_A_25_DIRRURAL_inputZEPR2"
									visible="{RURAL2Visible>/visible}" class="sapDireccion"
									value="{ZDIRModel2>/A_25_DIRRURAL}"
									enabled="{EnabledModel>/Enabled}" change="onChangeDireccion2">

								</Input>
								<layoutData>
									<l:GridData span="L8 M12 S12" />
								</layoutData>
							</VBox>


							<Title text="{i18n>ZDIR.NDIR}" style="H2"
								visible="{CD2Visible>/visible}"
								class="sapUmcMLabelBold  sapDireccion">
								<layoutData>
									<l:GridData span="L12 M12 S12" />
								</layoutData>
							</Title>

							<Button text="{i18n>ZDIR.VDIR}"
								enabled="{EnabledModel>/Enabled}" press="onShowAdress"
								visible="{VIA2Visible>/visible}" class="sapUiSmallMarginBottom">
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</Button>

							<Button text="{i18n>ZDIR.BDIR}"
								enabled="{EnabledModel>/Enabled}" press="onEraseAdress"
								visible="{VIA2Visible>/visible}" class="sapUiSmallMarginBottom">
								<layoutData>
									<l:GridData span="L2 M12 S12" />
								</layoutData>
							</Button>

							<VBox>
								<Title text="{i18n>ZDIR.DIRNOTIF}" style="H2"
									visible="{DIR2Visible>/visible}"
									class="sapUmcMLabelBold  sapDireccion">
								</Title>
								<Input id="_ZDIR_A_24_DIRECCIONCORREGIDA_inputZEPR2"
									visible="{VIA2Visible>/visible}" change="onChangeDireccion2" value="{ZDIRModel2>/A_29_DIRPANTALLA}"
									enabled="false">

								</Input>
								<layoutData>
									<l:GridData span="L7 M12 S12" />
								</layoutData>
							</VBox>


						</l:content>
					</l:Grid>
				</Panel>

				<!-- FIN MODIFICACION DE DIRECCION DE NOTIFICACION -->


				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" vSpacing="0">

					<VBox>
						<Label text="{i18n>ZEPR.A_12_CORREO_ELECTRONICO}"
							class="sapUmcMLabelBold" id="A_12_CORREO_ELECTRONICO" />
						<Input id="_ZEPR_A_12_CORREO_ELECTRONICO_input" change="validateEmail"  
							value="{ZEPRModel>/A_12_CORREO_ELECTRONICO}"  tooltip="{i18n>ZEPR.TTA_12_CORREO_ELECTRONICO}"
							enabled="{EnabledModel>/Enabled}" />
						<layoutData>
							<l:GridData span="L5 M12 S12" />
						</layoutData>
					</VBox>

					<VBox>
						<Label text="7. TIPO DE AGENTE RETENEDOR"
							class="sapUmcMLabelBold" />
						<HBox alignItems="Center">
							<Label text="{i18n>ZEPR.A_13_ENTIDAD_PUBLICA}"
								id="A_13_ENTIDAD_PUBLICA" />
							<CheckBox id="_ZEPR_A_13_ENTIDAD_PUBLICA_input" tooltip="{i18n>ZEPR.TTTAGENTERET}"
								value="{ZEPRModel>/A_13_ENTIDAD_PUBLICA}"
								select="onSelectTipoAgenteRet" enabled="{EnabledModel>/Enabled}"
								change="onChange" />
							<Label text="{i18n>ZEPR.A_14_PERSONA_NATURAL}"
								id="A_14_PERSONA_NATURAL" />
							<CheckBox id="_ZEPR_A_14_PERSONA_NATURAL_input" tooltip="{i18n>ZEPR.TTTAGENTERET}"
								select="onSelectTipoAgenteRet"
								value="{ZEPRModel>/A_14_PERSONA_NATURAL}"
								enabled="{EnabledModel>/Enabled}" change="onChange" />
							<Label text="{i18n>ZEPR.A_15_PERSONA_JURIDICA}"
								id="A_15_PERSONA_JURIDICA" />
							<CheckBox id="_ZEPR_A_15_PERSONA_JURIDICA_input" tooltip="{i18n>ZEPR.TTTAGENTERET}"
								select="onSelectTipoAgenteRet"
								value="{ZEPRModel>/A_15_PERSONA_JURIDICA}"
								enabled="{EnabledModel>/Enabled}" change="onChange" />
						</HBox>
						<layoutData>
							<l:GridData span="L7 M12 S12" />
						</layoutData>
					</VBox>

				</l:Grid>
			</Panel>


			<Panel expandable="true" expanded="true"
				headerText="{i18n>ZEPR.BASRET}" width="auto" 
				class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton">
				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" vSpacing="0">

					<Label text="{i18n>DESC}" class="sapUmcMLabelBold">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Label>
					<Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Label>

					<!-- 8. BASE DE RETENCIO ACT... -->
					<Label text="{i18n>ZEPR.A_16_BASE_GRAVABLE}" 
						id="A_16_BASE_GRAVABLE">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Input id="_ZEPR_A_16_BASE_GRAVABLE_input"  tooltip="{i18n>ZEPR.TTA_16_BASE_GRAVABLE}"
						value="{path:'ZEPRModel>/A_16_BASE_GRAVABLE', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input
						value="{path:'ZEPRModel>/A_16_BASE_GRAVABLE', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!-- 9 BASE DE RETENCION .. -->
					<Label text="{i18n>ZEPR.A_17_BG_RETENCION_HI}"
						id="A_17_BG_RETENCION_HI">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>

					<Input id="_ZEPR_A_17_BG_RETENCION_HI_input"  tooltip="{i18n>ZEPR.TTA_17_BG_RETENCION_HI}"
						value="{path:'ZEPRModel>/A_17_BG_RETENCION_HI', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input value="{path:'ZEPRModel>/A_17_BG_RETENCION_HI', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!-- 10. TOTAL BASE DE RETENCI... -->
					<Label text="{i18n>ZEPR.A_18_TOTAL_BASE_RETENCION}"
						id="A_18_TOTAL_BASE_RETENCION">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>

					<Input id="_ZEPR_A_18_TOTAL_BASE_RETENCION_input"  tooltip="{i18n>ZEPR.TTA_18_TOTAL_BASE_RETENCION}"
						value="{path:'ZEPRModel>/A_18_TOTAL_BASE_RETENCION', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input id="_ZEPR_A_45_LIQ_TOTAL_BASE_RETENCION_input"
						value="{path:'ZEPRModel>/A_45_LIQ_TOTAL_BASE_RETENCION', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>


				</l:Grid>
			</Panel>


			<Panel expandable="true" expanded="true"
				headerText="C. VALOR RETENCIONES" width="auto"
				class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton">
				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" vSpacing="0">

					<Label text="{i18n>DESC}" class="sapUmcMLabelBold">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Label>
					<Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Label>

					<!-- 11. VALOR DE LA RETENCION ACTIV..EDU... -->

					<Label text="{i18n>ZEPR.A_19_VAL_RET_ACT_EDUCATIVA}"
						id="A_19_VAL_RET_ACT_EDUCATIVA">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Input id="_ZEPR_A_19_VAL_RET_ACT_EDUCATIVA_input"  tooltip="{i18n>ZEPR.TTA_19_VAL_RET_ACT_EDUCATIVA}"
						value="{path:'ZEPRModel>/A_19_VAL_RET_ACT_EDUCATIVA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>				
  				
					<Input  id="_ZEPR_A_57_LIQ_VAL_RET_ACT_EDUCATIVA_input"
						value="{path:'ZEPRModel>/A_57_LIQ_VAL_RET_ACT_EDUCATIVA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!--12. VALOR DE RETENCIONES OTROS -->

					<Label text="{i18n>ZEPR.A_20_VAL_RET_HECHOS_IMPONIBLES}"
						id="A_20_VAL_RET_HECHOS_IMPONIBLES">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>

					<Input id="_ZEPR_A_20_VAL_RET_HECHOS_IMPONIBLES_input"  tooltip="{i18n>ZEPR.TTA_20_VAL_RET_HECHOS_IMPONIBLES}"
						value="{path:'ZEPRModel>/A_20_VAL_RET_HECHOS_IMPONIBLES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

   				
					<Input id="_ZEPR_A_58_LIQ_VAL_RET_HECHOS_IMPON_input" 
						value="{path:'ZEPRModel>/A_58_LIQ_VAL_RET_HECHOS_IMPON', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!-- 13. TOTAL RETENCIONES EFECTUADAS -->
					<Label text="{i18n>ZEPR.A_21_TOTAL_RET_EFECTUADAS}"
						id="A_21_TOTAL_RET_EFECTUADAS">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>

					<Input id="_ZEPR_A_21_TOTAL_RET_EFECTUADAS_input"  tooltip="{i18n>ZEPR.TTA_21_TOTAL_RET_EFECTUADAS}"
						value="{path:'ZEPRModel>/A_21_TOTAL_RET_EFECTUADAS', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input id="_ZEPR_A_46_LIQ_TOTAL_RET_EFECTUADAS_input"
						value="{path:'ZEPRModel>/A_46_LIQ_TOTAL_RET_EFECTUADAS', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>


					<!-- 14. MAS SANCION POR EXTEMPORAN -->
					 <HBox alignItems="Center">
					<Label text="{i18n>ZEPR.A_22_SAN_EXTEMPORANEIDAD}"
						id="A_22_SAN_EXTEMPORANEIDAD"/>
						<ComboBox 
	            selectedKey = "{ZEPRModel>/A_63_EMPLAZAMIENTO}"   enabled="{EnabledModel>/Enabled}"
					width="50%"  change="onChange" tooltip="{i18n>ZEPR.TTA_63_EMPLAZAMIENTO}"
					   class="sapDireccion"
					id="_ZEPR_A_63_EMPLAZAMIENTO_input"
					items="{Si>/results}"
					>
					<core:Item key="{Si>Value}" text="{Si>View}" class="letraDireccion"
					/>
				</ComboBox>
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</HBox>
					<Input id="_ZEPR_A_22_SAN_EXTEMPORANEIDAD_input"  tooltip="{i18n>ZEPR.TTA_22_SAN_EXTEMPORANEIDAD}"
						value="{path:'ZEPRModel>/A_22_SAN_EXTEMPORANEIDAD', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input id="_ZEPR_A_52_LIQ_SAN_EXTEMPORANEIDAD_input"
						value="{path:'ZEPRModel>/A_52_LIQ_SAN_EXTEMPORANEIDAD', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!-- 15. MAS OTRAS SANCIONES -->
					<Label text="{i18n>ZEPR.A_23_MAS_OTRO_SANCIONES}"
						id="A_23_MAS_OTRO_SANCIONES">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>

					<Input id="_ZEPR_A_23_MAS_OTRO_SANCIONES_input"  tooltip="{i18n>ZEPR.TTA_23_MAS_OTRO_SANCIONES}"
						value="{path:'ZEPRModel>/A_23_MAS_OTRO_SANCIONES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

   			
					<Input id="_ZEPR_A_59_LIQ_MAS_OTRO_SANCIONES_input"
						value="{path:'ZEPRModel>/A_59_LIQ_MAS_OTRO_SANCIONES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!-- 16. TOTAL SALDO A CARGO -->
					<Label text="{i18n>ZEPR.A_24_TOTAL_SALDO_CARGO}"
						id="A_24_TOTAL_SALDO_CARGO">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Input id="_ZEPR_A_24_TOTAL_SALDO_CARGO_input"  tooltip="{i18n>ZEPR.TTA_24_TOTAL_SALDO_CARGO}"
						value="{path:'ZEPRModel>/A_24_TOTAL_SALDO_CARGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input id="_ZEPR_A_47_LIQ_TOTAL_SALDO_CARGO_input"
						value="{path:'ZEPRModel>/A_47_LIQ_TOTAL_SALDO_CARGO', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

				</l:Grid>
			</Panel>


			<Panel expandable="true" expanded="true" headerText="D. PAGO"
				width="auto"
				class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton">
				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" vSpacing="0">

					<Label text="{i18n>DESC}" class="sapUmcMLabelBold">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Label text="{i18n>VALDIG}" class="sapUmcMLabelBold ">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Label>
					<Label text="{i18n>VALCALC}" class="sapUmcMLabelBold ">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Label>

					<!-- 17. VALOR A PAGAR RETENCIONES -->
					<Label text="{i18n>ZEPR.A_25_VALOR_A_PAGAR_RET}"
						id="A_25_VALOR_A_PAGAR_RET">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Input id="_ZEPR_A_25_VALOR_A_PAGAR_RET_input"  tooltip="{i18n>ZEPR.TTA_25_VALOR_A_PAGAR_RET}"
						value="{path:'ZEPRModel>/A_25_VALOR_A_PAGAR_RET', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input id="_ZEPR_A_48_LIQ_VALOR_A_PAGAR_RET_input"
						value="{path:'ZEPRModel>/A_48_LIQ_VALOR_A_PAGAR_RET', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!--18. INTERESES POR MORA -->
					<Label text="{i18n>ZEPR.A_26_ZINTERESES_MORA}"
						id="A_26_ZINTERESES_MORA">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>

					<Input id="_ZEPR_A_26_ZINTERESES_MORA_input"  tooltip="{i18n>ZEPR.TTA_26_ZINTERESES_MORA}"
						value="{path:'ZEPRModel>/A_26_ZINTERESES_MORA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input id="_ZEPR_A_51_LIQ_INTERESES_MORA_input"
						value="{path:'ZEPRModel>/A_51_LIQ_INTERESES_MORA', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!-- 19. VALOR A PAGAR POR SANCIONE -->
					<Label text="{i18n>ZEPR.A_27_ZVALOR_PAGAR_SANCIONES}"
						id="A_27_ZVALOR_PAGAR_SANCIONES">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Input id="_ZEPR_A_27_ZVALOR_PAGAR_SANCIONES_input"  tooltip="{i18n>ZEPR.TTA_27_ZVALOR_PAGAR_SANCIONES}"
						value="{path:'ZEPRModel>/A_27_ZVALOR_PAGAR_SANCIONES', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>
					<Input id="_ZEPR_A_49_LIQ_ZVALOR_PAGAR_SANC_input"
						value="{path:'ZEPRModel>/A_49_LIQ_ZVALOR_PAGAR_SANC', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<!-- 20. TOTAL A PAGAR -->
					<Label text="{i18n>ZEPR.A_28_TOTAL_PAGAR}"
						id="A_28_TOTAL_PAGAR">
						<layoutData>
							<l:GridData span="L8 M12 S12" />
						</layoutData>
					</Label>
					<Input id="_ZEPR_A_28_TOTAL_PAGAR_input"  tooltip="{i18n>ZEPR.TTA_28_TOTAL_PAGAR}"
						value="{path:'ZEPRModel>/A_28_TOTAL_PAGAR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="{EnabledModel>/Enabled}" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

					<Input id="_ZEPR_A_50_LIQ_TOTAL_PAGAR_input"
						value="{path:'ZEPRModel>/A_50_LIQ_TOTAL_PAGAR', type:'sap.ui.model.type.Currency', formatOptions:{decimals: 0, showMeasure: false, source: {}}}"
						enabled="false" change="onChange">
						<layoutData>
							<l:GridData span="L2 M12 S12" />
						</layoutData>
					</Input>

				</l:Grid>
			</Panel>

			<!-- CORRECCIONES -->
			<Panel expandable="true" expanded="true"
				headerText="{i18n>ZEPR.ECORRECCION}" width="auto"
				class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton">
				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" vSpacing="0">

					<Hbox>
						<VBox alignItems="Center">
							<Label text="{i18n>ZEPR.A_29_CORRECCION}"
								id="A_29_CORRECCION" />
							<Checkbox id="_ZEPR_A_29_CORRECCION_input" tooltip="{i18n>ZEPR.TTA_29_CORRECCION}"
								value="{ZEPRModel>/A_29_CORRECCION}" select="onSelectCorreccion"
								enabled="{EnabledModel>/Enabled}" change="onChange" />
						</VBox>
						<layoutData>
							<l:GridData span="L3 M12 S12" />
						</layoutData>
					</Hbox>
					<Hbox>
						<VBox>
							<Label text="{i18n>ZEPR.A_34_ANO}" id="A_30ANO_CORRECCION" />
							<Input id="_ZEPR_A_30ANO_CORRECCION_input" maxLength="4"  tooltip="{i18n>ZEPR.TTA_30ANO_CORRECCION}"
								enabled="{OUSOVisible>/visible}"
								value="{ZEPRModel>/A_30ANO_CORRECCION}" change="onChange" />

						</VBox>
						<layoutData>
							<l:GridData span="L3 M12 S12" />
						</layoutData>
					</Hbox>
					<Hbox>
						<VBox>
							<Label text="{i18n>ZEPR.A_31_DECLANUM}" id="A_31_DECLANUM" />
							<Input id="_ZEPR_A_31_DECLANUM_input"  tooltip="{i18n>ZEPR.TTA_31_DECLANUM}"
								value="{ZEPRModel>/A_31_DECLANUM}"
								enabled="{OUSOVisible>/visible}" change="onChange" />

						</VBox>
						<layoutData>
							<l:GridData span="L3 M12 S12" />
						</layoutData>
					</Hbox>
					<Hbox>
						<VBox>
							<Label text="{i18n>ZEPR.A_32_PERIODO_CORR}"
								id="A_32_PERIODO_CORR" />
							<ComboBox selectedKey="{ZEPRModel>/A_32_PERIODO_CORR}"  tooltip="{i18n>ZEPR.TTA_32_PERIODO_CORR}"
								width="50%" change="onChange"
								class="sapDireccion" enabled="{OUSOVisible>/visible}"
								id="_ZEPR_A_32_PERIODO_CORR_input" items="{Periodo>/results}">
								<core:Item key="{Periodo>Number}"
									text="{Periodo>Number}" class="letraDireccion" />

							</ComboBox>


						</VBox>
						<layoutData>
							<l:GridData span="L3 M12 S12" />
						</layoutData>
					</Hbox>


				</l:Grid>
			</Panel>


			<Panel expandable="true" expanded="true" headerText="F. FIRMAS"
				width="auto"
				class="sapUiResponsiveMargin sapUmcConsumptionSegmentedButton">
				<l:Grid defaultSpan="L1 M4 S6" class="sapDireccion" vSpacing="0">

					<Hbox alignItems="Center">
						<Label text="{i18n>ZEPR.FIRMADECL}">
						</Label>
						<layoutData>
							<l:GridData span="L6 M12 S12" />
						</layoutData>
					</Hbox>

					<HBox alignItems="Center">
						<Label text="{i18n>ZEPR.A_39_FIRMA_CONTADOR}"
							id="A_39_FIRMA_CONTADOR" />
						<CheckBox id="_ZEPR_A_39_FIRMA_CONTADOR_input" 
							value="{ZEPRModel>/A_39_FIRMA_CONTADOR}"  select="onSelectSegundaFirma"
							enabled="{EnabledModel>/Enabled}" change="onChange" />
						<Label text="{i18n>ZEPR.A_40_REVISOR_FISCAL}"
							id="A_40_REVISOR_FISCAL" />
						<CheckBox id="_ZEPR_A_40_REVISOR_FISCAL_input"
							value="{ZEPRModel>/A_40_REVISOR_FISCAL}"  select="onSelectSegundaFirma"
							enabled="{EnabledModel>/Enabled}" change="onChange" />
						<layoutData>
							<l:GridData span="L6 M12 S12" />
						</layoutData>
					</HBox>


					<HBox alignItems="Center">
						<Label text="{i18n>ZEPR.A_37_NOMBRE_DECLARANTE}"
							id="A_37_NOMBRE_DECLARANTE" />
						<Input id="_ZEPR_A_37_NOMBRE_DECLARANTE_input" width="200%" liveChange = "onLiveChangeUpper"
							value="{ZEPRModel>/A_37_NOMBRE_DECLARANTE}"
							enabled="{EnabledModel>/Enabled}" change="onChange" />
						<layoutData>
							<l:GridData span="L6 M12 S12" />
						</layoutData>
					</HBox>

					<HBox alignItems="Center">
						<Label text="{i18n>ZEPR.A_41_NOMBRE_CONT_FISC}"
							id="A_41_NOMBRE_CONT_FISC" />
						<Input id="_ZEPR_A_41_NOMBRE_CONT_FISC_input" width="250%" liveChange = "onLiveChangeUpper"
							value="{ZEPRModel>/A_41_NOMBRE_CONT_FISC}"
							enabled="{SEGFIRMAVisible>/visible}" change="onChange" />
						<layoutData>
							<l:GridData span="L6 M12 S12" />
						</layoutData>
					</HBox>

					<HBox alignItems="Center">

						<Label text="{i18n>ZEPR.A_38_NUMERO_DECLARANTE}"
							id="A_38_NUMERO_DECLARANTE" />
						<Input id="_ZEPR_A_38_NUMERO_DECLARANTE_input" width="203%" liveChange = "onLiveChangeUpper"
							value="{ZEPRModel>/A_38_NUMERO_DECLARANTE}"
							 enabled="{EnabledModel>/Enabled}" change="onChange" />
						<layoutData>
							<l:GridData span="L6 M12 S12" />
						</layoutData>
					</HBox>

					<HBox alignItems="Center">
						<Label text="{i18n>ZEPR.A_42_NUMERO_CONT_FISC}"
							id="A_42_NUMERO_CONT_FISC" />
						<Input id="_ZEPR_A_42_NUMERO_CONT_FISC_input" liveChange = "onLiveChangeUpper"
							value="{ZEPRModel>/A_42_NUMERO_CONT_FISC}"
							 enabled="{SEGFIRMAVisible>/visible}" change="onChange" />
						<Label text="{i18n>ZEPR.A_43_TARJETA_PROF}"
							id="A_43_TARJETA_PROF" />
						<Input id="_ZEPR_A_43_TARJETA_PROF_input" liveChange = "onLiveChangeUpper"
							value="{ZEPRModel>/A_43_TARJETA_PROF}"  enabled="{SEGFIRMAVisible>/visible}"
							change="onChange" />
						<layoutData>
							<l:GridData span="L6 M12 S12" />
						</layoutData>
					</HBox>




				</l:Grid>
			</Panel>

			<!-- CAMPOS SIN VISUALIZACION -->

			<!-- <Label text="Existe Diferencia Valores Liq" id="A_55_EXISTE_DIFERENCIA"/> 
				<Input id="_ZEPR_A_55_EXISTE_DIFERENCIA_input" value="{ZEPRModel>/A_55_EXISTE_DIFERENCIA}" 
				enabled="{EnabledModel>/Enabled}" change="onChange"/> 
				
				<Label text="FECHA_VENCIMIENTO" id="A_35_FECHA_VENCIMIENTO"/> <DatePicker id="_ZEPR_A_35_FECHA_VENCIMIENTO_date" 
				value="{ZEPRModel>/A_35_FECHA_VENCIMIENTO}" enabled="{EnabledModel>/Enabled}" 
				displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange"/> 
				
				<Label text="FORMULARIO No." id="A_44_NO_FORMULARIO"/> 
				<Input id="_ZEPR_A_44_NO_FORMULARIO_input" value="{ZEPRModel>/A_44_NO_FORMULARIO}" enabled="{EnabledModel>/Enabled}" change="onChange"/> 
				
				<Label text="FECHA VENCIMIENTO PRESENTACION" id="A_56_FECHA_VENCIMIENTO_PREST"/>
   				<DatePicker id="_ZEPR_A_56_FECHA_VENCIMIENTO_PREST_date" value="{ZEPRModel>/A_56_FECHA_VENCIMIENTO_PREST}" enabled="{EnabledModel>/Enabled}" displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange"/>
				

   				<Label text="Fecha Creacion de la Declaraci" id="A_61_FECHA_CREACION"/>
   				<DatePicker id="_ZEPR_A_61_FECHA_CREACION_date" value="{ZEPRModel>/A_61_FECHA_CREACION}" enabled="{EnabledModel>/Enabled}" displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd" change="onChange"/>
				
				
				<Label text="{i18n>ZEPR.A_36_FECHA_PRESENTACION}"	id="A_36_FECHA_PRESENTACION" />
				<DatePicker id="_ZEPR_A_36_FECHA_PRESENTACION_date"
				value="{ZEPRModel>/A_36_FECHA_PRESENTACION}" enabled="false"
				displayFormat="dd.MM.yyyy" valueFormat="yyyyMMdd"
				change="onChange" />
				
				<Label text="Existen Diferencias" id="A_62_EXISTE_VAL_DIF"/>
   				<Input id="_ZEPR_A_62_EXISTE_VAL_DIF_input" value="{ZEPRModel>/A_62_EXISTE_VAL_DIF}" enabled="{EnabledModel>/Enabled}" change="onChange"/>
				-->
			<!-- </f:SimpleForm> -->
		</ScrollContainer>

</core:FragmentDefinition>